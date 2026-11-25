// Parsing and filtering for the catalogue. The data itself lives in catalogue.csv,
// which is loaded by catalogue.js — keep this module free of Vite-only imports so
// scripts/check.mjs can validate the CSV under plain Node.

const CATEGORIES = { "back cover": "backCover", "tempered glass": "temperedGlass" };
const COLUMNS = ["brand", "model", "dimensions", "cameracutout", "category", "type", "sku", "fit"];

// RFC 4180: a quoted field may hold commas, newlines and "" escaped quotes.
function splitRows(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') field += c;
      else if (text[i + 1] === '"') (field += '"'), i++;
      else quoted = false;
    } else if (c === '"') quoted = true;
    else if (c === ",") (row.push(field), (field = ""));
    else if (c === "\n") (row.push(field), rows.push(row), (row = []), (field = ""));
    else if (c !== "\r") field += c;
  }
  if (field || row.length) (row.push(field), rows.push(row));

  return rows.filter((r) => r.some((v) => v.trim()));
}

export function parseCatalogue(text) {
  const rows = splitRows(text.replace(/^﻿/, "")); // Excel writes a UTF-8 BOM
  if (!rows.length) throw new Error("catalogue.csv is empty");

  const header = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, ""));
  const missing = COLUMNS.filter((c) => !header.includes(c));
  if (missing.length) throw new Error(`catalogue.csv is missing column(s): ${missing.join(", ")}`);

  const models = new Map();
  const seenSkus = new Map();

  rows.slice(1).forEach((cells, i) => {
    const line = i + 2; // 1-based, counting the header
    const get = (col) => (cells[header.indexOf(col)] ?? "").trim();
    const [brand, model, sku] = [get("brand"), get("model"), get("sku")];

    if (!brand || !model || !sku)
      throw new Error(`catalogue.csv line ${line}: Brand, Model and SKU are required`);

    const key = CATEGORIES[get("category").toLowerCase()];
    if (!key)
      throw new Error(
        `catalogue.csv line ${line}: Category must be "Back cover" or "Tempered glass", got "${get("category")}"`
      );

    if (seenSkus.has(sku))
      throw new Error(
        `catalogue.csv line ${line}: SKU "${sku}" is already used on line ${seenSkus.get(sku)}`
      );
    seenSkus.set(sku, line);

    const id = `${brand}\u0000${model}`;
    if (!models.has(id))
      models.set(id, {
        brand,
        model,
        dimensions: get("dimensions"),
        cameraCutout: get("cameracutout"),
        backCover: [],
        temperedGlass: [],
      });

    // A model's own details come from its first row; later rows only add accessories.
    models.get(id)[key].push({ type: get("type"), sku, fit: get("fit") });
  });

  return [...models.values()];
}

export function filterModels(db, brand, query) {
  const q = query.trim().toLowerCase();
  return db
    .filter((m) => brand === ALL_BRANDS || m.brand === brand)
    .filter(
      (m) =>
        !q ||
        m.model.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q)
    );
}

export const ALL_BRANDS = "All brands";

export const buildBrands = (db) => [ALL_BRANDS, ...new Set(db.map((m) => m.brand))];
