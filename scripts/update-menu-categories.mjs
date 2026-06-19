import { existsSync, readFileSync } from "node:fs";
import { createClient } from "next-sanity";

loadLocalEnv();

const dryRun = !process.argv.includes("--commit");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6oertjtu";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token && !dryRun) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN. Add a write token to .env.local before running with --commit.");
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

function classifyProduct(product) {
  const title = String(product.title || "").toLowerCase();
  const text = [
    product.title,
    product.displayCategory,
    product.servingDetails,
    product.description,
    ...(product.variants || [])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/\b(p\.?\s*ochra|ochra)\b/.test(title) || /\bps\.?\s*natalensis\b/.test(title)) {
    return "Exotics";
  }

  if (/\b(tablet|lozenge|mibblers?|tarts?)\b/.test(text)) {
    return "Tablets";
  }

  if (/\b(tincture|spray)\b/.test(text)) {
    return "Tinctures";
  }

  if (/\b(capsules?|caps\b|microdose|clarity caps|braveheart)\b/.test(text)) {
    return "Microdose Capsules";
  }

  if (
    product.displayCategory !== "Chocolate" &&
    /\b(gumm|moonberries|moonberry|off label|human nature|level up|upgrade|visionz)\b/.test(text)
  ) {
    return "Gummies";
  }

  if (
    product.displayCategory !== "Chocolate" &&
    /\bmycrochips\b/.test(title)
  ) {
    return "Gummies";
  }

  if (
    product.displayCategory !== "Chocolate" &&
    /\b(golden door|neau tropics)\b/.test(title) &&
    !/\bbar|mini\b/.test(title)
  ) {
    return "Gummies";
  }

  if (/\b(chocolate|bar|mini hearts|happy bars|mind.?s eye|day trip|nirvana|stoned ape|botanical tiger|odyssey)\b/.test(text)) {
    return "Chocolate";
  }

  if (/\b(tea|cacao|elixirs?|beverages?|honey|majic|majun|granola|date ball|mystical minds?)\b/.test(text)) {
    return "Miscellaneous";
  }

  return "Mushrooms";
}

const products = await client.fetch(
  '*[_type == "menuProduct"] | order(sortOrder asc) {_id, title, displayCategory, servingDetails, description, variants}'
);

const updates = products
  .map((product) => ({
    ...product,
    nextCategory: classifyProduct(product)
  }))
  .filter((product) => product.displayCategory !== product.nextCategory);

for (const product of updates) {
  const message = `${dryRun ? "dry-run" : "update"} ${product.title}: ${product.displayCategory || "(blank)"} -> ${product.nextCategory}`;
  console.log(message);

  if (!dryRun) {
    await client.patch(product._id).set({ displayCategory: product.nextCategory }).commit();
  }
}

console.log(
  JSON.stringify(
    {
      dryRun,
      totalProducts: products.length,
      updates: updates.length
    },
    null,
    2
  )
);
