import { DateTime } from "luxon";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginNavigation from "@11ty/eleventy-navigation";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import CleanCSS from "clean-css";
import { minify } from "html-minifier-terser";
import externalLinks from "eleventy-plugin-external-links";

export default function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");

  // Copy the contents of the `public` folder to the output folder
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPlugin(externalLinks, {
    name: "external-links",
    regex: /^(([a-z]+:)|(\/\/))/i,
    target: "_blank",
    rel: "noopener",
    extensions: [".html"],
    includeDoctype: true,
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
    const pageArr = arr.filter((page) => page.url !== currPage);
    pageArr.sort(() => {
      return 0.5 - Math.random();
    });
    return pageArr.slice(0, limit);
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

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

  eleventyConfig.addTransform("htmlmin", async function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = await minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Shortcodes:
  const BUNNY_CDN_BASE = "https://images.paigar.es/idenautas-img/";

  eleventyConfig.addShortcode(
    "progImage",
    (imagePath, alt = "", mirror = false) => {
      const thumbUrl = `${BUNNY_CDN_BASE}${imagePath}?width=100&quality=30`;
      const mirrorClass = mirror ? " espejo" : "";
      return `<div class="imagen cubrir progresivo${mirrorClass}" data-src="${BUNNY_CDN_BASE}${imagePath}" data-alt="${alt}"><img class="img-small" src="${thumbUrl}" alt="${alt}" /></div>`;
    }
  );

  // Override @11ty/eleventy-dev-server defaults (used only with --serve)
  eleventyConfig.setServerOptions({
    showVersion: true,
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/",
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
}
