const site = require("./src/_data/site.json");
const CleanCSS = require("clean-css");
const { minify } = require("terser");
const fs = require("fs");
const path = require("path");
const https = require("https");
const CDN = site.cdn;
const QUALITY = 75;
const SRC_DIR = path.join(__dirname, "src");
const LQIP_PATH = path.join(SRC_DIR, "_data", "lqip.json");
let lqipData = fs.existsSync(LQIP_PATH) ? JSON.parse(fs.readFileSync(LQIP_PATH, "utf8")) : {};

// ── LQIP generation ──────────────────────────────────────────
function findImagePaths() {
  const paths = new Set();
  const imgRegex = /\{%[-\s]*img\s+"([^"]+)"/g;
  const heroRegex = /^heroImage:\s*(.+)$/m;
  (function scan(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== "_data" && entry.name !== "node_modules") {
        scan(full);
      } else if (entry.name.endsWith(".njk") || entry.name.endsWith(".md")) {
        const content = fs.readFileSync(full, "utf8");
        let m;
        while ((m = imgRegex.exec(content)) !== null) paths.add(m[1]);
        const hm = content.match(heroRegex);
        if (hm) paths.add(hm[1].trim());
      }
    }
  })(SRC_DIR);
  return [...paths];
}

function fetchBase64(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const type = res.headers["content-type"] || "image/jpeg";
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(`data:${type};base64,${Buffer.concat(chunks).toString("base64")}`));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function generateLQIP() {
  const images = findImagePaths();
  const existing = fs.existsSync(LQIP_PATH) ? JSON.parse(fs.readFileSync(LQIP_PATH, "utf8")) : {};
  const lqip = {};
  let downloaded = 0;
  for (const img of images) {
    if (existing[img]) {
      lqip[img] = existing[img];
    } else {
      try {
        lqip[img] = await fetchBase64(`${CDN}${img}?width=20&quality=30`);
        downloaded++;
        console.log(`  [lqip] ✓ ${img}`);
      } catch (err) {
        console.error(`  [lqip] ✗ ${img}: ${err.message}`);
      }
    }
  }
  if (downloaded > 0) {
    fs.writeFileSync(LQIP_PATH, JSON.stringify(lqip, null, 2));
    console.log(`  [lqip] ${downloaded} new, ${images.length} total`);
  }
  return lqip;
}

const IMG_PRESETS = {
  hero:    { widths: [480, 960, 1920], sizes: "100vw", aspect: "16/9" },
  content: { widths: [400, 800, 1200], sizes: "(max-width: 768px) 100vw, 50vw", aspect: "3/2" },
  mosaic:  { widths: [400, 800],       sizes: "(max-width: 768px) 100vw, 33vw", aspect: "3/2" },
  visual:  { widths: [480, 960],       sizes: "(max-width: 768px) 100vw, 80vw", aspect: "3/2" },
  thumb:   { widths: [400, 800],       sizes: "(max-width: 768px) 100vw, 40vw", aspect: "16/9" },
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/assets/");

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addFilter("lqip", (imgPath) => {
    return lqipData[imgPath] || "";
  });

  eleventyConfig.addFilter("randomSlice", (arr, exclude, count, poolSize) => {
    const filtered = arr.filter(item => item.url !== exclude);
    const pool = poolSize ? filtered.slice(-poolSize) : filtered;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  });

  /**
   * {% img "idenautas-web/nosotros_01.png", "Alt text", "hero" %}
   * {% img "idenautas-img/header/header004.jpeg", "Alt text", "content", "lazy" %}
   *
   * preset: hero | content | mosaic | visual | thumb
   * loading: "eager" | "lazy" (default: "lazy")
   * quality: number (default: 75)
   */
  eleventyConfig.addShortcode("img", function (path, alt = "", preset = "content", loading = "lazy", quality = QUALITY) {
    const cfg = IMG_PRESETS[preset] || IMG_PRESETS.content;
    const base = CDN + path;
    const largest = cfg.widths[cfg.widths.length - 1];
    const src = `${base}?width=${largest}&quality=${quality}`;
    const srcset = cfg.widths
      .map((w) => `${base}?width=${w}&quality=${quality} ${w}w`)
      .join(", ");
    const priority = loading === "eager" ? ' fetchpriority="high"' : "";
    const aspect = cfg.aspect || "3/2";
    const [aw, ah] = aspect.split("/").map(Number);
    const width = largest;
    const height = Math.round(largest * ah / aw);
    const lqip = lqipData[path] || `${base}?width=20&quality=30`;
    return `<div class="lqip-wrap" style="background-image:url('${lqip}')"><img src="${src}" srcset="${srcset}" sizes="${cfg.sizes}" alt="${alt}" loading="${loading}" width="${width}" height="${height}"${priority} onload="this.parentNode.classList.add('loaded')"></div>`;
  });

  // ── LQIP generation (pre-build) ─────────────────────────
  eleventyConfig.on("eleventy.before", async () => {
    lqipData = await generateLQIP();
  });

  // ── Asset Minification (post-build) ──────────────────────
  eleventyConfig.on("eleventy.after", async () => {
    const outDir = path.join(__dirname, "_site", "assets");

    // CSS
    const cssDir = path.join(outDir, "css");
    if (fs.existsSync(cssDir)) {
      const minifier = new CleanCSS({ level: 2 });
      fs.readdirSync(cssDir)
        .filter(f => f.endsWith(".css"))
        .forEach(f => {
          const fp = path.join(cssDir, f);
          const result = minifier.minify(fs.readFileSync(fp, "utf8"));
          if (!result.errors.length) fs.writeFileSync(fp, result.styles);
        });
    }

    // JS
    const jsDir = path.join(outDir, "js");
    if (fs.existsSync(jsDir)) {
      for (const f of fs.readdirSync(jsDir).filter(f => f.endsWith(".js"))) {
        const fp = path.join(jsDir, f);
        const result = await minify(fs.readFileSync(fp, "utf8"));
        if (result.code) fs.writeFileSync(fp, result.code);
      }
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
