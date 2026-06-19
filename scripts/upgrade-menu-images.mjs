import { createReadStream, existsSync, readFileSync } from "node:fs";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { createClient } from "next-sanity";

loadLocalEnv();

const dryRun = process.argv.includes("--dry-run");
const limitArg = process.argv.find((argument) => argument.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.");
}

if (!token && !dryRun) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN. Add a write token to .env.local before upgrading images.");
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-06-15",
  useCdn: false
});

function loadLocalEnv() {
  for (const fileName of [".env.local", ".env"]) {
    if (!existsSync(fileName)) continue;
    const contents = readFileSync(fileName, "utf8");
    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...valueParts] = trimmed.split("=");
      if (!process.env[key]) {
        process.env[key] = valueParts.join("=").replace(/^['"]|['"]$/g, "");
      }
    }
  }
}

function originalWordPressImageUrl(url) {
  return url.replace(/-\d+x\d+(?=\.(?:jpe?g|png|webp)$)/i, "");
}

function contentTypeFromUrl(url) {
  const ext = extname(new URL(url).pathname).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

async function uploadImage(product, fullUrl) {
  const response = await fetch(fullUrl);
  if (!response.ok) {
    throw new Error(`Image download failed for ${product.title}: ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  const dir = await mkdtemp(join(tmpdir(), "tlc-menu-image-upgrade-"));
  const ext = extname(new URL(fullUrl).pathname) || ".jpg";
  const filePath = join(dir, `${slugify(product.title)}-full${ext}`);
  await writeFile(filePath, bytes);

  return client.assets.upload("image", createReadStream(filePath), {
    filename: `${slugify(product.title)}-full${ext}`,
    contentType: contentTypeFromUrl(fullUrl),
    title: product.title
  });
}

const products = await client.fetch(
  '*[_type == "menuProduct" && defined(sourceImageUrl)] | order(sortOrder asc) {_id, title, sourceImageUrl, "currentImage": image.asset->_id, "imageAlt": image.alt}'
);

let checked = 0;
let upgraded = 0;
let skipped = 0;
let failed = 0;

for (const product of products.slice(0, limit)) {
  checked += 1;
  const fullUrl = originalWordPressImageUrl(product.sourceImageUrl);

  if (fullUrl === product.sourceImageUrl) {
    skipped += 1;
    console.log(`skip ${product.title} - source is already full-size`);
    continue;
  }

  const head = await fetch(fullUrl, { method: "HEAD" });
  if (!head.ok) {
    failed += 1;
    console.log(`fail ${product.title} - full-size URL returned ${head.status}`);
    continue;
  }

  if (dryRun) {
    console.log(`dry-run ${product.title} -> ${fullUrl}`);
    continue;
  }

  const asset = await uploadImage(product, fullUrl);
  await client
    .patch(product._id)
    .set({
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: product.imageAlt || product.title
      },
      sourceImageUrl: fullUrl
    })
    .commit();

  upgraded += 1;
  console.log(`upgrade ${product.title}`);
}

console.log(
  JSON.stringify(
    {
      dryRun,
      checked,
      upgraded,
      skipped,
      failed,
      totalWithSourceImages: products.length
    },
    null,
    2
  )
);
