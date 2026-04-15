// Converts a batch of .njk templates into .vto files next to them.
// The original .njk files are left in place so Eleventy keeps building
// during the migration window.
//
// Usage: deno run -A scripts/njk-to-vto.ts [...paths]
//   e.g.  deno run -A scripts/njk-to-vto.ts src/index.njk src/servicios src/nosotros
//
// For each converted file, any patterns that need a human eye
// (loop.index/.first/.last, Nunjucks "if" used as a ternary expression,
// etc.) are printed as warnings so you can track down the files to review.

import { walk } from "jsr:@std/fs@1/walk";
import { extname } from "jsr:@std/path@1";

interface Warning {
  file: string;
  line: number;
  message: string;
  context: string;
}

const warnings: Warning[] = [];

function collectWarnings(file: string, content: string) {
  const lines = content.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (/\bloop\.(index0?|first|last|length|revindex|key)\b/.test(line)) {
      warnings.push({
        file,
        line: i + 1,
        message: "Vento has no `loop` variable; rewrite with entries().",
        context: line.trim(),
      });
    }
    // Nunjucks ternary expression: `{{ "x" if cond }}` or `{{ x if cond else y }}`
    if (/\{\{[^}]*\bif\b[^}]*\}\}/.test(line) && !/\{%\s*if\b/.test(line)) {
      warnings.push({
        file,
        line: i + 1,
        message: "Nunjucks ternary ({{ a if b }}) — convert to `b ? a : ''`.",
        context: line.trim(),
      });
    }
    if (/\{%\s*for\s+\w+\s*,\s*\w+\s+in\b/.test(line)) {
      warnings.push({
        file,
        line: i + 1,
        message: "for a, b in obj — convert to `for [a, b] of Object.entries(obj)`.",
        context: line.trim(),
      });
    }
  });
}

function convert(content: string): string {
  let out = content;

  // 1. Frontmatter tweaks (only applies to the first frontmatter block).
  out = out.replace(/^---\r?\n([\s\S]*?)\r?\n---/, (_m, fm: string) => {
    let f = fm;
    f = f.replace(/layouts\/([^\s.]+)\.njk/g, "layouts/$1.vto");
    f = f.replace(/^permalink:\s*/m, "url: ");
    f = f.replace(/^\s*eleventyExcludeFromCollections:\s*true\s*$/m, "");
    return `---\n${f}\n---`;
  });

  // 2. Comments: {# ... #} → {{# ... #}}
  out = out.replace(/\{#([\s\S]*?)#\}/g, "{{#$1#}}");

  // 3. Shortcodes registered as global JS functions.
  //    {% img "a", "b" %} → {{ img("a", "b") }}
  out = out.replace(
    /\{%-?\s*img\s+([^%]+?)\s*-?%\}/g,
    "{{ img($1) }}",
  );
  out = out.replace(
    /\{%-?\s*cardPicture\s+([^%]+?)\s*-?%\}/g,
    "{{ cardPicture($1) }}",
  );
  out = out.replace(
    /\{%-?\s*blogUrl\s+([^%]+?)\s*-?%\}/g,
    "{{ blogUrl($1) }}",
  );

  // 4. set / if / elif / else / endif / for / endfor / include
  //    Preserves whitespace-control dashes.
  const tag = (name: string, replacement: string) =>
    new RegExp(`\\{%(-?)\\s*${name}\\b([^%]*?)(-?)%\\}`, "g");

  out = out.replace(tag("set", ""), (_m, lDash, body, rDash) =>
    `{{${lDash} set${body}${rDash}}}`
  );
  out = out.replace(
    /\{%(-?)\s*if\s+([^%]*?)(-?)%\}/g,
    (_m, l, body, r) => `{{${l} if ${body.trim()} ${r}}}`,
  );
  out = out.replace(
    /\{%(-?)\s*elif\s+([^%]*?)(-?)%\}/g,
    (_m, l, body, r) => `{{${l} else if ${body.trim()} ${r}}}`,
  );
  out = out.replace(
    /\{%(-?)\s*else\s*(-?)%\}/g,
    (_m, l, r) => `{{${l} else ${r}}}`,
  );
  out = out.replace(
    /\{%(-?)\s*endif\s*(-?)%\}/g,
    (_m, l, r) => `{{${l} /if ${r}}}`,
  );
  out = out.replace(
    /\{%(-?)\s*for\s+([^%]+?)\s+in\s+([^%]+?)(-?)%\}/g,
    (_m, l, v, arr, r) => `{{${l} for ${v} of ${arr.trim()} ${r}}}`,
  );
  out = out.replace(
    /\{%(-?)\s*endfor\s*(-?)%\}/g,
    (_m, l, r) => `{{${l} /for ${r}}}`,
  );
  out = out.replace(
    /\{%(-?)\s*include\s+("[^"]+"|'[^']+')\s*(-?)%\}/g,
    (_m, l, file, r) => {
      const vto = file.replace(/\.njk(['"])/, ".vto$1");
      return `{{${l} include ${vto} ${r}}}`;
    },
  );

  // 5. Inside {{ ... }} expressions: `| filter` → `|> filter`, drop `| safe`,
  //    translate `or`/`and`/`not` to JS operators. We only touch the bodies
  //    of `{{ ... }}` so we don't rewrite literal prose.
  out = out.replace(/\{\{([^}]*?)\}\}/g, (_m, inner: string) => {
    let x = inner;
    // Drop `| safe` (Vento doesn't escape by default)
    x = x.replace(/\|\s*safe\b/g, "");
    // Boolean operators: word boundaries
    x = x.replace(/\bor\b/g, "||");
    x = x.replace(/\band\b/g, "&&");
    x = x.replace(/\bnot\s+/g, "!");
    // Single pipe (filter) → `|>`, but NOT `||`
    x = x.replace(/(^|[^|])\|(?!\|)/g, "$1 |> ");
    return `{{${x}}}`;
  });

  // 6. `page.url` → `url` — safe in the templates we're converting.
  out = out.replace(/\bpage\.url\b/g, "url");

  return out;
}

async function convertFile(path: string) {
  const content = await Deno.readTextFile(path);
  const converted = convert(content);
  collectWarnings(path, converted);
  const vtoPath = path.replace(/\.njk$/, ".vto");
  await Deno.writeTextFile(vtoPath, converted);
  console.log(`  ✓ ${path} → ${vtoPath}`);
}

async function main() {
  const args = Deno.args.length > 0 ? Deno.args : [
    "src/index.njk",
    "src/contacto.njk",
    "src/contacto",
    "src/servicios",
    "src/nosotros",
    "src/_includes/partials",
  ];

  const files: string[] = [];
  for (const a of args) {
    try {
      const stat = await Deno.stat(a);
      if (stat.isFile && extname(a) === ".njk") {
        files.push(a.replaceAll("\\", "/"));
      } else if (stat.isDirectory) {
        for await (const entry of walk(a, { exts: [".njk"] })) {
          files.push(entry.path.replaceAll("\\", "/"));
        }
      }
    } catch {
      console.warn(`  ! ${a} not found, skipping`);
    }
  }

  console.log(`Converting ${files.length} files…`);
  for (const f of files) await convertFile(f);

  if (warnings.length > 0) {
    console.log(`\n⚠  ${warnings.length} patterns need manual review:\n`);
    for (const w of warnings) {
      console.log(`  ${w.file}:${w.line}`);
      console.log(`    ${w.message}`);
      console.log(`    > ${w.context}\n`);
    }
  } else {
    console.log("\n✓ No warnings. Review the generated .vto files and try a build.");
  }
}

await main();
