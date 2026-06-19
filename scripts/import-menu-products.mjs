import { createReadStream, existsSync, readFileSync } from "node:fs";
import { mkdtemp, writeFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { createClient } from "next-sanity";

loadLocalEnv();

const inputPath =
  process.argv.slice(2).find((argument) => !argument.startsWith("--")) ||
  "work/menu-extraction.json";
const dryRun = process.argv.includes("--dry-run");
const replace = process.argv.includes("--replace");
const publish = process.argv.includes("--publish");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.");
}

if (!token && !dryRun) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN. Add a write token to .env.local before importing.");
}

if (!existsSync(inputPath)) {
  throw new Error(`Could not find import file: ${inputPath}`);
}

const products = JSON.parse(await readFile(inputPath, "utf8"));

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

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

function splitDescription(description) {
  const lines = String(description || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  const variants = [];
  const bodyLines = [];

  for (const line of lines) {
    if (line.startsWith("-")) {
      variants.push(line.replace(/^-+\s*/, ""));
    } else {
      bodyLines.push(line);
    }
  }

  const servingDetails =
    bodyLines[0] && /(\d|\bgram|\bgrams|\bpieces|\bcapsule|\bspray|\blozenge|\bjar|\boz|mg)/i.test(bodyLines[0])
      ? bodyLines[0]
      : "";

  const descriptionLines = servingDetails ? bodyLines.slice(1) : bodyLines;

  return {
    servingDetails,
    description: descriptionLines.join("\n\n"),
    variants
  };
}

function contentTypeFromUrl(url) {
  const ext = extname(new URL(url).pathname).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
}

async function uploadImage(product, slug) {
  if (!product.imageUrl) return null;

  const response = await fetch(product.imageUrl);
  if (!response.ok) {
    throw new Error(`Image download failed for ${product.name}: ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  const dir = await mkdtemp(join(tmpdir(), "tlc-menu-import-"));
  const ext = extname(new URL(product.imageUrl).pathname) || ".jpg";
  const filePath = join(dir, `${slug}${ext}`);
  await writeFile(filePath, bytes);

  return client.assets.upload("image", createReadStream(filePath), {
    filename: `${slug}${ext}`,
    contentType: contentTypeFromUrl(product.imageUrl),
    title: product.name
  });
}

let created = 0;
let skipped = 0;
let replaced = 0;
const slugCounts = new Map();

for (const [index, product] of products.entries()) {
  const baseSlug = slugify(product.name);
  const occurrence = (slugCounts.get(baseSlug) || 0) + 1;
  slugCounts.set(baseSlug, occurrence);
  const slug = occurrence === 1 ? baseSlug : `${baseSlug}-${occurrence}`;
  const id = `menuProduct.${slug}`;
  const documentId = id;
  const existing = dryRun ? null : await client.getDocument(documentId);

  if (existing && !replace) {
    skipped += 1;
    console.log(`skip ${product.name}`);
    continue;
  }

  const parts = splitDescription(product.description);
  const doc = {
    _id: documentId,
    _type: "menuProduct",
    title: product.name,
    slug: { _type: "slug", current: slug },
    category: "Sacrament",
    displayCategory: product.category,
    price: product.price,
    description: parts.description,
    servingDetails: parts.servingDetails,
    variants: parts.variants,
    sourceImageUrl: product.imageUrl,
    available: product.available ?? true,
    featured: false,
    memberOnly: true,
    published: publish,
    sortOrder: index + 1,
    notesForStaff: "Imported from the previous WordPress menu. Please review description, category, price, and availability before publishing."
  };

  if (dryRun) {
    console.log(`dry-run ${product.name}`);
    continue;
  }

  const asset = await uploadImage(product, slug);
  if (asset?._id) {
    doc.image = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: product.imageAlt || product.name
    };
  }

  await client.createOrReplace(doc);

  if (existing) {
    replaced += 1;
    console.log(`replace ${product.name}`);
  } else {
    created += 1;
    console.log(`create ${product.name}`);
  }
}

console.log(
  JSON.stringify(
    {
      inputPath,
      dryRun,
      publish,
      replace,
      created,
      replaced,
      skipped,
      total: products.length
    },
    null,
    2
  )
);
