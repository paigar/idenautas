module.exports = {
  lang: "es",
  permalink: function (data) {
    // Change (English) /es/blog/my-post URLs to have an implied language code /blog/my-post URLs instead.
    let [slashPrefixEmpty, langCode, ...stem] =
      data.page.filePathStem.split("/");
    let path = stem.join("/");

    // Account for `permalink: 404.html` style
    return stem[stem.length - 1] === "index"
      ? `${path}.html`
      : `${path}/index.html`;
  },
};
