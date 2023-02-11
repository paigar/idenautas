module.exports = {
  lang: "en",
  permalink: function (data) {
    // Slug override is set in the post for localized URL slugs
    // e.g. /en/blog/fourthpost.md will optionally write to
    //    /en/blog/fourth-post/ instead of /es/blog/cuarta-publicacion/
    if (data.slugOverride) {
      return `/${data.lang}/blog/${this.slugify(data.slugOverride)}/`;
    }
  },
};
