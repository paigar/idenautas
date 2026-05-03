import lume from "lume/mod.ts";
import vento from "lume/plugins/vento.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import terser from "lume/plugins/terser.ts";
import { transform } from "npm:lightningcss";
import { generateLQIP } from "./scripts/lqip.ts";

// ─── Site metadata & LQIP cache (loaded once at config time) ──────────────
const siteData = JSON.parse(await Deno.readTextFile("./src/_data/site.json"));
const CDN: string = siteData.cdn;

// Seeded at config time from the on-disk cache; refreshed (new images
// downloaded from the CDN) via a beforeBuild hook further down.
let lqipData: Record<string, string> = {};
try {
  lqipData = JSON.parse(await Deno.readTextFile("./src/_data/lqip.json"));
} catch {
  // first build, no cache yet
}

// ─── Inline CSS, minified at config-load time with lightningcss ───────────
const cssDir = "./src/_includes/css";
function minifyCss(css: string): string {
  const { code } = transform({
    filename: "inline.css",
    code: new TextEncoder().encode(css),
    minify: true,
    sourceMap: false,
  });
  return new TextDecoder().decode(code);
}
const inlineCSS = minifyCss(
  (await Deno.readTextFile(`${cssDir}/style.css`)) +
    (await Deno.readTextFile(`${cssDir}/cookieconsent.css`)),
);
const syntaxCSS = minifyCss(await Deno.readTextFile(`${cssDir}/syntax.css`));

// ─── Responsive image helpers ─────────────────────────────────────────────
const IMG_PRESETS = {
  hero: { widths: [480, 1200, 1920], sizes: "100vw", aspect: "16/9" },
  content: {
    widths: [480, 800, 1200],
    sizes: "(max-width: 768px) 100vw, 50vw",
    aspect: "3/2",
  },
  mosaic: {
    widths: [480, 800],
    sizes: "(max-width: 768px) 100vw, 33vw",
    aspect: "3/2",
  },
  visual: {
    widths: [480, 800],
    sizes: "(max-width: 768px) 100vw, 80vw",
    aspect: "3/2",
  },
  thumb: {
    widths: [480, 800],
    sizes: "(max-width: 768px) 100vw, 40vw",
    aspect: "16/9",
  },
} as const;

type Preset = keyof typeof IMG_PRESETS;

function imgBase(imgPath: string): string {
  const i = imgPath.lastIndexOf(".");
  return i >= 0 ? imgPath.slice(0, i) : imgPath;
}

function imgUrl(imgPath: string, size: number, fmt: string): string {
  return `${CDN}${imgBase(imgPath)}-${size}.${fmt}`;
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Mirrors @sindresorhus/slugify — the URL-slug generator Eleventy uses.
// Key detail: German umlauts transliterate as -e digraphs (ü→ue, not →u),
// otherwise URLs drift away from the existing Eleventy-built links.
function slugify(str: string): string {
  return String(str ?? "")
    .replace(/ä/g, "ae").replace(/Ä/g, "Ae")
    .replace(/ö/g, "oe").replace(/Ö/g, "Oe")
    .replace(/ü/g, "ue").replace(/Ü/g, "Ue")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^\w\s-]/g, " ")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Lume site ────────────────────────────────────────────────────────────
const site = lume({
  src: "./src",
  dest: "./_site",
  includes: "_includes",
});

site.use(vento());
site.use(code_highlight());
site.use(terser({
  extensions: [".js"],
}));

// Regenerate the LQIP cache before every build; only new images trigger
// an HTTP round-trip, so repeat builds stay fast.
site.addEventListener("beforeBuild", async () => {
  lqipData = await generateLQIP({ quiet: false });
});

// Assets: .js goes through terser, everything else is copied as-is.
site.add("assets/js", "assets/js");
site.copy("assets/fonts");
site.copy("assets/img");
site.copy("assets/css");

// During the migration: ignore Eleventy-only artifacts.
// Markdown content directories still use .njk layouts, so exclude them until
// each is ported to Vento.

// UTF-8 BOM on llms.txt / llms-full.txt for better ingestion by some LLM tools
site.process([".txt"], (pages) => {
  for (const page of pages) {
    const out = page.outputPath ?? "";
    if (!out.endsWith("llms.txt") && !out.endsWith("llms-full.txt")) continue;
    if (typeof page.content !== "string") continue;
    if (page.content.startsWith("\uFEFF")) continue;
    page.content = "\uFEFF" + page.content;
  }
});

// ─── Global data ──────────────────────────────────────────────────────────
site.data("site", siteData);
site.data("inlineCSS", inlineCSS);
site.data("syntaxCSS", syntaxCSS);
site.data("build", Date.now().toString(36));

// ─── Filters ──────────────────────────────────────────────────────────────
site.filter("htmlDateString", (d: unknown) => {
  if (!d) return "";
  return new Date(d as string | number | Date).toISOString().split("T")[0];
});

site.filter("isoDateString", (d: unknown) => {
  if (!d) return "";
  return (
    new Date(d as string | number | Date).toISOString().split("T")[0] +
    "T00:00:00+01:00"
  );
});

site.filter("readableDate", (d: unknown) => {
  if (!d) return "";
  return new Date(d as string | number | Date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

site.filter("year", () => String(new Date().getFullYear()));

site.filter("lqip", (imgPath: string) => lqipData[imgPath] || "");

site.filter(
  "imgUrl",
  (imgPath: string, size: number, fmt = "jpg") => imgUrl(imgPath, size, fmt),
);

// Also expose helpers as global functions so Vento can call them directly:
//   {{ imgUrl(heroImage, 1200, "jpg") }}
//   {{ year() }}
site.data(
  "imgUrl",
  (imgPath: string, size: number, fmt = "jpg") => imgUrl(imgPath, size, fmt),
);
site.data("year", () => String(new Date().getFullYear()));

// deno-lint-ignore no-explicit-any
function sortByOrder(arr: any[]) {
  // deno-lint-ignore no-explicit-any
  const getOrder = (p: any) => p?.order ?? p?.data?.order ?? 99;
  return [...arr].sort((a, b) => getOrder(a) - getOrder(b));
}
site.filter("sortByOrder", sortByOrder);
site.data("sortByOrder", sortByOrder);

site.filter("escape", (s: unknown) => escapeAttr(String(s ?? "")));

// ─── Blog URL generation + blogUrl(fileSlug) lookup ─────────────────────
// Blog post permalinks match the original Eleventy pattern (title-slugified).
// The blogUrl() helper resolves a *filename slug* to the final URL, used by
// posts that cross-link to each other by filename.
const blogSlugMap = new Map<string, string>();

site.preprocess([".md"], (pages) => {
  for (const page of pages) {
    // Markdown runs through Vento first, then markdown-it, so shortcodes
    // ({{ img() }}, {{ blogUrl() }}, etc.) can appear anywhere in content.
    // A file can opt out by declaring its own `templateEngine` in frontmatter
    // (e.g. posts that discuss Vento syntax itself and contain literal
    // `{{ ... }}` examples inside code blocks).
    // deno-lint-ignore no-explicit-any
    const fmAny = page.data as any;
    if (fmAny.templateEngine === undefined) {
      fmAny.templateEngine = ["vto", "md"];
    }

    const srcPath = page.src?.path ?? "";
    if (!srcPath.startsWith("/blog/")) continue;

    // Tag every real blog post with "blog". Doing it here (instead of in
    // _data.yml) keeps blog/index.vto and the etiquetas generator out of
    // the "blog" collection — Lume unions tag arrays across the cascade,
    // so a parent-level tag can't be reset via frontmatter.
    const existingTags: string[] = Array.isArray(page.data.tags)
      ? page.data.tags
      : [];
    if (!existingTags.includes("blog")) {
      page.data.tags = [...existingTags, "blog"];
    }

    // URL generation mirrors the old Eleventy permalink:
    //   permalink: "/blog/{{ title | slugify }}/"
    const title = page.data.title ?? "";
    const url = `/blog/${slugify(title)}/`;
    page.data.url = url;

    const fileSlug = srcPath.split("/").pop() ?? "";
    if (fileSlug) blogSlugMap.set(fileSlug, url);

    // Legacy Eleventy shortcodes inside the markdown body are rewritten
    // to Vento function calls on the fly. The source files are kept in
    // their original shape so the diff against pre-Lume history stays
    // small, but everything Vento sees is already in its own syntax.
    //   {% img "x.png", "alt", "hero" %}  →  {{ img("x.png", "alt", "hero") }}
    //   {% cardPicture img, alt, true %}  →  {{ cardPicture(img, alt, true) }}
    //   {% blogUrl "file-slug" %}         →  {{ blogUrl("file-slug") }}
    const raw = page.data.content;
    if (typeof raw === "string") {
      // Expose the pristine markdown body (pre-render) for llms-full.txt.
      // deno-lint-ignore no-explicit-any
      (page.data as any).rawBody = raw;
      page.data.content = raw
        .replace(/\{%-?\s*img\s+(.+?)\s*-?%\}/g, "{{ img($1) }}")
        .replace(
          /\{%-?\s*cardPicture\s+(.+?)\s*-?%\}/g,
          "{{ cardPicture($1) }}",
        )
        .replace(/\{%-?\s*blogUrl\s+(.+?)\s*-?%\}/g, "{{ blogUrl($1) }}");
    }
  }
});

site.data("blogUrl", (fileSlug: string) => blogSlugMap.get(fileSlug) ?? "#");

// deno-lint-ignore no-explicit-any
function randomSlice(arr: any[], exclude: string, count: number, poolSize = 0) {
  const filtered = arr.filter((item) =>
    (item?.url ?? item?.data?.url) !== exclude
  );
  const pool = poolSize ? filtered.slice(-poolSize) : filtered;
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}
site.filter("randomSlice", randomSlice);
site.data("randomSlice", randomSlice);

// ─── Shortcodes as global functions (Vento calls them as regular JS) ─────
site.data(
  "img",
  function img(
    imgPath: string,
    alt = "",
    preset: Preset = "content",
    loading: "lazy" | "eager" = "lazy",
  ): string {
    const safeAlt = escapeAttr(alt);
    const cfg = IMG_PRESETS[preset] ?? IMG_PRESETS.content;
    const widths = cfg.widths;
    const largest = widths[widths.length - 1];
    const srcsetFor = (fmt: string) =>
      widths.map((w) => `${imgUrl(imgPath, w, fmt)} ${w}w`).join(", ");
    const priority = loading === "eager" ? ' fetchpriority="high"' : "";
    const [aw, ah] = cfg.aspect.split("/").map(Number);
    const width = largest;
    const height = Math.round((largest * ah) / aw);
    const lqip = lqipData[imgPath] || imgUrl(imgPath, 16, "jpg");
    return `<div class="lqip-wrap" style="background-image:url('${lqip}')"><picture><source type="image/avif" srcset="${
      srcsetFor("avif")
    }" sizes="${cfg.sizes}"><source type="image/webp" srcset="${
      srcsetFor("webp")
    }" sizes="${cfg.sizes}"><img src="${
      imgUrl(imgPath, largest, "jpg")
    }" srcset="${
      srcsetFor("jpg")
    }" sizes="${cfg.sizes}" alt="${safeAlt}" loading="${loading}" width="${width}" height="${height}"${priority} onload="this.closest('.lqip-wrap').classList.add('loaded')"></picture></div>`;
  },
);

site.data(
  "cardPicture",
  function cardPicture(
    imgPath: string,
    alt = "",
    wide = false,
    eager = false,
  ): string {
    const safeAlt = escapeAttr(alt);
    const widths = wide ? [480, 800] : [480];
    const largest = widths[widths.length - 1];
    const width = largest;
    const height = Math.round((largest * 9) / 16);
    const loading = eager ? "eager" : "lazy";
    const srcsetFor = (fmt: string) =>
      widths.map((w) => `${imgUrl(imgPath, w, fmt)} ${w}w`).join(", ");
    const lqip = lqipData[imgPath] || imgUrl(imgPath, 16, "jpg");

    if (widths.length === 1) {
      return `<div class="lqip-wrap" style="background-image:url('${lqip}')"><picture><source type="image/avif" srcset="${
        imgUrl(imgPath, largest, "avif")
      }"><source type="image/webp" srcset="${
        imgUrl(imgPath, largest, "webp")
      }"><img src="${
        imgUrl(imgPath, largest, "jpg")
      }" alt="${safeAlt}" loading="${loading}" width="${width}" height="${height}" onload="this.closest('.lqip-wrap').classList.add('loaded')"></picture></div>`;
    }

    return `<div class="lqip-wrap" style="background-image:url('${lqip}')"><picture><source type="image/avif" srcset="${
      srcsetFor("avif")
    }" sizes="(max-width: 768px) 100vw, 50vw"><source type="image/webp" srcset="${
      srcsetFor("webp")
    }" sizes="(max-width: 768px) 100vw, 50vw"><img src="${
      imgUrl(imgPath, largest, "jpg")
    }" srcset="${
      srcsetFor("jpg")
    }" sizes="(max-width: 768px) 100vw, 50vw" alt="${safeAlt}" loading="${loading}" width="${width}" height="${height}" onload="this.closest('.lqip-wrap').classList.add('loaded')"></picture></div>`;
  },
);

export default site;
