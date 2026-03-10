const site = require("./src/_data/site.json");
const CleanCSS = require("clean-css");
const { minify } = require("terser");
const fs = require("fs");
const path = require("path");
const CDN = site.cdn;
const QUALITY = 75;

const IMG_PRESETS = {
  hero:    { widths: [480, 960, 1920], sizes: "100vw" },
  content: { widths: [400, 800, 1200], sizes: "(max-width: 768px) 100vw, 50vw" },
  mosaic:  { widths: [400, 800, 1200], sizes: "(max-width: 768px) 100vw, 33vw" },
  visual:  { widths: [480, 960, 1200], sizes: "(max-width: 768px) 100vw, 80vw" },
  thumb:   { widths: [400, 800],       sizes: "(max-width: 768px) 100vw, 40vw" },
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
    return `<img src="${src}" srcset="${srcset}" sizes="${cfg.sizes}" alt="${alt}" loading="${loading}">`;
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
