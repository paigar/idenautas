import "dotenv/config";
import { execSync } from "child_process";
import { createInterface } from "readline";
import { readFileSync, readdirSync, statSync, rmSync } from "fs";
import { extname, join, posix } from "path";

const SITE_DIR = "_site";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".pdf": "application/pdf",
};

function contentTypeFor(filePath) {
  return MIME_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream";
}

// --- 1. Commit y push a GitHub ---
function preguntar(texto) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(texto, (respuesta) => {
      rl.close();
      resolve(respuesta.trim());
    });
  });
}

async function gitPush() {
  console.log("\n📦 Subiendo cambios a GitHub...");
  try {
    execSync("git add -A", { stdio: "inherit" });
    const status = execSync("git status --porcelain").toString().trim();
    if (status) {
      const mensaje =
        (await preguntar("   Mensaje del commit: ")) || "actualización del sitio";
      execSync(`git commit -m "${mensaje}"`, { stdio: "inherit" });
    } else {
      console.log("   Sin cambios que commitear.");
    }
    execSync("git push", { stdio: "inherit" });
    console.log("   GitHub actualizado.");
  } catch (err) {
    console.error("   Error en git:", err.message);
    process.exit(1);
  }
}

// --- 2. Build ---
function build() {
  console.log("\n🔨 Construyendo el sitio...");
  rmSync(SITE_DIR, { recursive: true, force: true });
  execSync("npm run lqip", { stdio: "inherit" });
  execSync("npx @11ty/eleventy", { stdio: "inherit" });
  console.log("   Build completado.");
}

// --- 3. Subir a Bunny Storage (API HTTP) ---
function listarFicheros(dir, base = "") {
  const ficheros = [];
  for (const entry of readdirSync(dir)) {
    const localPath = join(dir, entry);
    const remotePath = posix.join(base, entry);
    if (statSync(localPath).isDirectory()) {
      ficheros.push(...listarFicheros(localPath, remotePath));
    } else {
      ficheros.push({ localPath, remotePath });
    }
  }
  return ficheros;
}

async function subirAPI() {
  const { BUNNY_STORAGE_HOSTNAME, BUNNY_STORAGE_ZONE_NAME, BUNNY_STORAGE_PASSWORD } =
    process.env;
  const baseUrl = `https://${BUNNY_STORAGE_HOSTNAME}/${BUNNY_STORAGE_ZONE_NAME}`;
  const ficheros = listarFicheros(SITE_DIR);

  console.log(`\n🚀 Subiendo ${ficheros.length} ficheros a Bunny Storage...`);

  let subidos = 0;
  for (const { localPath, remotePath } of ficheros) {
    const url = `${baseUrl}/${remotePath}`;
    const body = readFileSync(localPath);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        AccessKey: BUNNY_STORAGE_PASSWORD,
        "Content-Type": contentTypeFor(localPath),
      },
      body,
    });

    if (!res.ok) {
      throw new Error(`Error subiendo ${remotePath}: ${res.status} ${res.statusText}`);
    }
    subidos++;
    process.stdout.write(`\r   ${subidos}/${ficheros.length} ficheros subidos`);
  }
  console.log("\n   Subida completada.");
}

// --- 4. Purgar caché de Bunny CDN ---
async function purgarCache() {
  console.log("\n🧹 Purgando caché de Bunny CDN...");
  const url = `https://api.bunny.net/pullzone/${process.env.BUNNY_PULL_ZONE_ID}/purgeCache`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      AccessKey: process.env.BUNNY_API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    console.log("   Caché purgada.");
  } else {
    console.error(`   Error al purgar: ${res.status} ${res.statusText}`);
  }
}

// --- Ejecutar todo ---
try {
  await gitPush();
  build();
  await subirAPI();
  await purgarCache();
  console.log("\n✅ Publicación completada.\n");
} catch (err) {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
}
