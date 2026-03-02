export default {
  lang: "es",
  permalink: function (data) {
    let [slashPrefixEmpty, langCode, ...stem] =
      data.page.filePathStem.split("/");
    let path = stem.join("/");
    return stem[stem.length - 1] === "index"
      ? `${path}.html`
      : `${path}/index.html`;
  },
};
