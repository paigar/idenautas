// Generates Low-Quality Image Placeholder (LQIP) base64 data URIs.
// Walks src/ for .md/.vto/.page.ts files, extracts every image path referenced
// by `{{ img(...) }}`, `{% img ... %}`, `{{ cardPicture(...) }}` and
// `heroImage:` frontmatter, and downloads a 16-px JPG from the CDN for each.
// Results are cached in src/_data/lqip.json; already-downloaded entries are
// kept, missing images are removed.
//
// Can be used as:
//   - a CLI tool:   deno run -A scripts/lqip.ts
//   - a module:     import { generateLQIP } from "./scripts/lqip.ts"

import { walk } from "jsr:@std/fs@1/walk";
import { encodeBase64 } from "jsr:@std/encoding@1/base64";

interface Site {
  cdn: string;
}

const SRC_DIR = "./src";
const OUTPUT = "./src/_data/lqip.json";

function imgBase(imgPath: string): string {
  const i = imgPath.lastIndexOf(".");
  return i >= 0 ? imgPath.slice(0, i) : imgPath;
}

// Match both legacy `{% img "path" %}` / `{% cardPicture "path" %}` (still
// present in the source .md files) and Vento `{{ img("path") }}`.
const SHORTCODE_RE =
  /(?:\{%[-\s]*|\{\{[-\s]*(?:await\s+)?)(?:img|cardPicture)\s*\(?\s*["']([^"']+)["']/g;
const HERO_RE = /^heroImage:\s*(.+)$/m;

async function findImagePaths(): Promise<string[]> {
  const paths = new Set<string>();
  for await (
    const entry of walk(SRC_DIR, {
      exts: [".md", ".vto", ".njk", ".ts"],
      skip: [/node_modules/, /_data\/lqip\.json$/],
    })
  ) {
    if (!entry.isFile) continue;
    const content = await Deno.readTextFile(entry.path);
    let m: RegExpExecArray | null;
    SHORTCODE_RE.lastIndex = 0;
    while ((m = SHORTCODE_RE.exec(content)) !== null) paths.add(m[1]);
    const hero = content.match(HERO_RE);
    if (hero) paths.add(hero[1].trim().replace(/^["']|["']$/g, ""));
  }
  return [...paths];
}

async function fetchBase64(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = res.headers.get("content-type") ?? "image/jpeg";
  const bytes = new Uint8Array(await res.arrayBuffer());
  return `data:${type};base64,${encodeBase64(bytes)}`;
}

export async function generateLQIP(
  { quiet = false }: { quiet?: boolean } = {},
): Promise<Record<string, string>> {
  const site: Site = JSON.parse(
    await Deno.readTextFile(`${SRC_DIR}/_data/site.json`),
  );
  const CDN = site.cdn;

  const images = await findImagePaths();
  const log = (msg: string) => {
    if (!quiet) console.log(msg);
  };
  log(`  [lqip] ${images.length} images referenced`);

  let existing: Record<string, string> = {};
  try {
    existing = JSON.parse(await Deno.readTextFile(OUTPUT));
  } catch {
    // first run, no cache
  }

  const lqip: Record<string, string> = {};
  let downloaded = 0;
  for (const img of images) {
    if (existing[img]) {
      lqip[img] = existing[img];
      continue;
    }
    const url = `${CDN}${imgBase(img)}-16.jpg`;
    try {
      lqip[img] = await fetchBase64(url);
      downloaded++;
      log(`  [lqip] ✓ ${img}`);
    } catch (err) {
      console.error(`  [lqip] ✗ ${img}: ${(err as Error).message}`);
    }
  }

  // Persist only when something changed (avoids pointless writes that touch
  // the mtime and would invalidate Lume's watcher in dev).
  const prevJson = JSON.stringify(existing, null, 2);
  const nextJson = JSON.stringify(lqip, null, 2);
  if (prevJson !== nextJson) {
    await Deno.writeTextFile(OUTPUT, nextJson);
    log(`  [lqip] ${downloaded} new, ${images.length} total → ${OUTPUT}`);
  } else {
    log(`  [lqip] up to date (${images.length} images)`);
  }

  return lqip;
}

if (import.meta.main) {
  await generateLQIP();
}
