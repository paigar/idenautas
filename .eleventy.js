const site = require("./src/_data/site.json");
const CleanCSS = require("clean-css");
const { minify } = require("terser");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const fs = require("fs");
const path = require("path");
const https = require("https");
const CDN = site.cdn;
const FORMATS = ["avif", "webp", "jpg"];

/** Strip extension from image path: "blog/120.png" → "blog/120" */
function imgBase(imgPath) {
	const ext = path.extname(imgPath);
	return ext ? imgPath.slice(0, -ext.length) : imgPath;
}

/** Build CDN URL for a given path, size and format */
function imgUrl(imgPath, size, fmt) {
	return `${CDN}${imgBase(imgPath)}-${size}.${fmt}`;
}
const SRC_DIR = path.join(__dirname, "src");
const LQIP_PATH = path.join(SRC_DIR, "_data", "lqip.json");
let lqipData = fs.existsSync(LQIP_PATH)
	? JSON.parse(fs.readFileSync(LQIP_PATH, "utf8"))
	: {};

// ── LQIP generation ──────────────────────────────────────────
function findImagePaths() {
	const paths = new Set();
	const imgRegex = /\{%[-\s]*img\s+"([^"]+)"/g;
	const heroRegex = /^heroImage:\s*(.+)$/m;
	(function scan(dir) {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (
				entry.isDirectory() &&
				entry.name !== "_data" &&
				entry.name !== "node_modules"
			) {
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
		https
			.get(url, (res) => {
				if (res.statusCode !== 200)
					return reject(new Error(`HTTP ${res.statusCode}`));
				const type = res.headers["content-type"] || "image/jpeg";
				const chunks = [];
				res.on("data", (c) => chunks.push(c));
				res.on("end", () =>
					resolve(
						`data:${type};base64,${Buffer.concat(chunks).toString("base64")}`,
					),
				);
				res.on("error", reject);
			})
			.on("error", reject);
	});
}

async function generateLQIP() {
	const images = findImagePaths();
	const existing = fs.existsSync(LQIP_PATH)
		? JSON.parse(fs.readFileSync(LQIP_PATH, "utf8"))
		: {};
	const lqip = {};
	let downloaded = 0;
	for (const img of images) {
		if (existing[img]) {
			lqip[img] = existing[img];
		} else {
			try {
				lqip[img] = await fetchBase64(imgUrl(img, 16, "jpg"));
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
};

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPassthroughCopy("src/assets");
	eleventyConfig.addWatchTarget("src/assets/");

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		if (!dateObj) return "";
		const d = new Date(dateObj);
		return d.toISOString().split("T")[0];
	});

	eleventyConfig.addFilter("isoDateString", (dateObj) => {
		if (!dateObj) return "";
		const d = new Date(dateObj);
		return d.toISOString().split("T")[0] + "T00:00:00+01:00";
	});

	eleventyConfig.addFilter("readableDate", (dateObj) => {
		if (!dateObj) return "";
		const d = new Date(dateObj);
		return d.toLocaleDateString("es-ES", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	});

	eleventyConfig.addFilter("year", () => new Date().getFullYear());

	eleventyConfig.addGlobalData("inlineCSS", () => {
		const cssDir = path.join(SRC_DIR, "_includes", "css");
		const style = fs.readFileSync(path.join(cssDir, "style.css"), "utf8");
		const cookie = fs.readFileSync(path.join(cssDir, "cookieconsent.css"), "utf8");
		return new CleanCSS({ level: 2 }).minify(style + cookie).styles;
	});

	eleventyConfig.addGlobalData("syntaxCSS", () => {
		const raw = fs.readFileSync(
			path.join(SRC_DIR, "_includes", "css", "syntax.css"),
			"utf8",
		);
		return new CleanCSS({ level: 2 }).minify(raw).styles;
	});

	eleventyConfig.addFilter("lqip", (imgPath) => {
		return lqipData[imgPath] || "";
	});

	eleventyConfig.addFilter("imgUrl", (imgPath, size, fmt) => {
		return imgUrl(imgPath, size, fmt || "jpg");
	});

	eleventyConfig.addFilter("rawBody", (inputPath) => {
		if (!inputPath) return "";
		try {
			const abs = path.isAbsolute(inputPath)
				? inputPath
				: path.join(__dirname, inputPath);
			const content = fs.readFileSync(abs, "utf8");
			return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trim();
		} catch (e) {
			return "";
		}
	});

	eleventyConfig.addFilter("sortByOrder", (arr) => {
		return [...arr].sort(
			(a, b) => (a.data.order || 99) - (b.data.order || 99),
		);
	});

	eleventyConfig.addFilter("randomSlice", (arr, exclude, count, poolSize) => {
		const filtered = arr.filter((item) => item.url !== exclude);
		const pool = poolSize ? filtered.slice(-poolSize) : filtered;
		const shuffled = [...pool].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, count);
	});

	eleventyConfig.addShortcode("blogUrl", function (fileSlug) {
		const blog =
			this.ctx && this.ctx.collections && this.ctx.collections.blog;
		if (!blog) return "#";
		const post = blog.find((p) => p.fileSlug === fileSlug);
		return post ? post.url : "#";
	});

	eleventyConfig.addShortcode(
		"img",
		function (
			imgPath,
			alt = "",
			preset = "content",
			loading = "lazy",
		) {
			const safeAlt = alt.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			const cfg = IMG_PRESETS[preset] || IMG_PRESETS.content;
			const largest = cfg.widths[cfg.widths.length - 1];
			const srcsetFor = (fmt) =>
				cfg.widths.map((w) => `${imgUrl(imgPath, w, fmt)} ${w}w`).join(", ");
			const priority = loading === "eager" ? ' fetchpriority="high"' : "";
			const aspect = cfg.aspect || "3/2";
			const [aw, ah] = aspect.split("/").map(Number);
			const width = largest;
			const height = Math.round((largest * ah) / aw);
			const lqip = lqipData[imgPath] || imgUrl(imgPath, 16, "jpg");
			return `<div class="lqip-wrap" style="background-image:url('${lqip}')"><picture><source type="image/avif" srcset="${srcsetFor("avif")}" sizes="${cfg.sizes}"><source type="image/webp" srcset="${srcsetFor("webp")}" sizes="${cfg.sizes}"><img src="${imgUrl(imgPath, largest, "jpg")}" srcset="${srcsetFor("jpg")}" sizes="${cfg.sizes}" alt="${safeAlt}" loading="${loading}" width="${width}" height="${height}"${priority} onload="this.parentNode.classList.add('loaded')"></picture></div>`;
		},
	);

	eleventyConfig.addShortcode(
		"cardPicture",
		function (imgPath, alt = "", wide = false, eager = false) {
			const safeAlt = alt.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			const widths = wide ? [480, 800] : [480];
			const largest = widths[widths.length - 1];
			const width = largest;
			const height = Math.round(largest * 9 / 16);
			const loading = eager ? "eager" : "lazy";
			const srcsetFor = (fmt) =>
				widths.map((w) => `${imgUrl(imgPath, w, fmt)} ${w}w`).join(", ");
			const lqip = lqipData[imgPath] || imgUrl(imgPath, 16, "jpg");
			if (widths.length === 1) {
				return `<div class="lqip-wrap" style="background-image:url('${lqip}')"><picture><source type="image/avif" srcset="${imgUrl(imgPath, largest, "avif")}"><source type="image/webp" srcset="${imgUrl(imgPath, largest, "webp")}"><img src="${imgUrl(imgPath, largest, "jpg")}" alt="${safeAlt}" loading="${loading}" width="${width}" height="${height}" onload="this.parentNode.classList.add('loaded')"></picture></div>`;
			}
			return `<div class="lqip-wrap" style="background-image:url('${lqip}')"><picture><source type="image/avif" srcset="${srcsetFor("avif")}" sizes="(max-width: 768px) 100vw, 50vw"><source type="image/webp" srcset="${srcsetFor("webp")}" sizes="(max-width: 768px) 100vw, 50vw"><img src="${imgUrl(imgPath, largest, "jpg")}" srcset="${srcsetFor("jpg")}" sizes="(max-width: 768px) 100vw, 50vw" alt="${safeAlt}" loading="${loading}" width="${width}" height="${height}" onload="this.parentNode.classList.add('loaded')"></picture></div>`;
		},
	);

	// ── LQIP generation (pre-build) ─────────────────────────
	eleventyConfig.on("eleventy.before", async () => {
		lqipData = await generateLQIP();
	});

	// ── Asset Minification (post-build) ──────────────────────
	eleventyConfig.on("eleventy.after", async () => {
		const outDir = path.join(__dirname, "_site", "assets");

		// JS
		const jsDir = path.join(outDir, "js");
		if (fs.existsSync(jsDir)) {
			for (const f of fs.readdirSync(jsDir).filter((f) => f.endsWith(".js"))) {
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
