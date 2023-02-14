const { DateTime } = require("luxon");
const rosetta = require("rosetta");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const {
  EleventyI18nPlugin,
  EleventyHtmlBasePlugin,
} = require("@11ty/eleventy");

const languageStrings = require("./i18n.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");

  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "es",
    errorMode: "allow-fallback",
  });

  eleventyConfig.addFilter(
    "readableDate",
    (dateObj, format = "dd LLLL yyyy") => {
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
    }
  );

  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    if (content.length < 200) return content;
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("randomLimit", (arr, limit, currPage) => {
    // Filters out current page
    const pageArr = arr.filter((page) => page.url !== currPage);
    // Randomizes remaining items
    pageArr.sort(() => {
      return 0.5 - Math.random();
    });
    // Returns array items up to limit
    return pageArr.slice(0, limit);
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Return all the tags used in a collection
  eleventyConfig.addFilter("getAllTags", (collection) => {
    let tagSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    }
    return Array.from(tagSet);
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
    );
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Shortcodes:
  eleventyConfig.addShortcode(
    "progImage",
    (uuid, alt = "") =>
      '<div class="imagen cubrir progresivo" data-uuid="' +
      uuid +
      '" data-alt="' +
      alt +
      '"><img class="img-small" src="https://ucarecdn.com/' +
      uuid +
      '/-/preview/100x100/-/format/auto/" alt="' +
      alt +
      '" /></div>'
  );

  // Override @11ty/eleventy-dev-server defaults (used only with --serve)
  eleventyConfig.setServerOptions({
    showVersion: true,
  });

  // i18n filter using Rosetta
  const rosettaLib = rosetta(languageStrings);

  eleventyConfig.addFilter("i18n", function (key, lang) {
    const I18N_PREFIX = "i18n.";
    if (key.startsWith(I18N_PREFIX)) {
      key = key.slice(I18N_PREFIX.length);
    }
    // depends on page.lang in 2.0.0-canary.14+
    let page =
      this.page || this.ctx?.page || this.context?.environments?.page || {};
    return rosettaLib.t(key, {}, lang || page.lang);
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "liquid"],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
