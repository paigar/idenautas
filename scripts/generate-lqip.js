/**
 * Generates LQIP (Low Quality Image Placeholder) base64 data URIs.
 * Scans all templates for {% img %} shortcode calls, downloads tiny
 * 20px versions from the CDN, and saves them as a JSON map.
 *
 * Usage: node scripts/generate-lqip.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const site = require("../src/_data/site.json");

const SRC_DIR = path.join(__dirname, "..", "src");
const OUTPUT = path.join(SRC_DIR, "_data", "lqip.json");
const CDN = site.cdn;
const LQIP_WIDTH = 20;
const LQIP_QUALITY = 30;

function findImagePaths() {
  const paths = new Set();
  const imgRegex = /\{%[-\s]*img\s+"([^"]+)"/g;
  const heroRegex = /^heroImage:\s*(.+)$/m;

  function scanDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith("_data") && entry.name !== "node_modules") {
        scanDir(full);
      } else if (entry.name.endsWith(".njk") || entry.name.endsWith(".md")) {
        const content = fs.readFileSync(full, "utf8");
        let match;
        while ((match = imgRegex.exec(content)) !== null) {
          paths.add(match[1]);
        }
        // Extract heroImage from frontmatter
        const heroMatch = content.match(heroRegex);
        if (heroMatch) {
          paths.add(heroMatch[1].trim());
        }
      }
    }
  }

  scanDir(SRC_DIR);
  return [...paths];
}

function fetchAsBase64(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const contentType = res.headers["content-type"] || "image/jpeg";
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString("base64");
        resolve(`data:${contentType};base64,${base64}`);
      });
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function main() {
  const imagePaths = findImagePaths();
  console.log(`Found ${imagePaths.length} images to generate LQIP for.`);

  // Load existing to avoid re-downloading unchanged images
  let existing = {};
  if (fs.existsSync(OUTPUT)) {
    existing = JSON.parse(fs.readFileSync(OUTPUT, "utf8"));
  }

  const lqip = { ...existing };
  let downloaded = 0;

  for (const imgPath of imagePaths) {
    if (lqip[imgPath]) {
      continue; // Already have this one
    }
    const url = `${CDN}${imgPath}?width=${LQIP_WIDTH}&quality=${LQIP_QUALITY}`;
    try {
      lqip[imgPath] = await fetchAsBase64(url);
      downloaded++;
      process.stdout.write(`  ✓ ${imgPath}\n`);
    } catch (err) {
      console.error(`  ✗ ${imgPath}: ${err.message}`);
    }
  }

  // Remove entries for images no longer in use
  const pathSet = new Set(imagePaths);
  for (const key of Object.keys(lqip)) {
    if (!pathSet.has(key)) {
      delete lqip[key];
    }
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(lqip, null, 2));
  console.log(`\nDone. ${downloaded} new, ${imagePaths.length} total. Saved to ${OUTPUT}`);
}

main().catch(console.error);
