import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parseCatalogue, filterModels, ALL_BRANDS } from "../src/data/compatibility.js";

const csv = readFileSync(fileURLToPath(new URL("../src/data/catalogue.csv", import.meta.url)), "utf8");
const compatibilityDb = parseCatalogue(csv); // throws, and so fails the build, on a bad CSV

// --- the real catalogue parses into the shape the app renders ---
const a13 = compatibilityDb.find((m) => m.model === "Model A13 Pro");
assert.equal(a13.cameraCutout, "Square module, top-left", "quoted fields keep their commas");
assert.equal(a13.dimensions, "162.4 × 75.7 × 8.2 mm");
assert.equal(a13.backCover.length, 2, "rows of one category group onto the model");
assert.deepEqual(a13.temperedGlass.map((g) => g.sku), ["TG-RL13P-9H", "TG-RL13P-PRV"]);
assert.ok(
  compatibilityDb.every((m) => m.brand && m.model && m.backCover.length + m.temperedGlass.length),
  "every model has a brand, a model name and at least one accessory"
);

// --- a bad CSV is rejected rather than half-loaded ---
const header = "Brand,Model,Dimensions,Camera cutout,Category,Type,SKU,Fit\n";
assert.throws(
  () => parseCatalogue(header + "Brand R,Model A13 Pro,1 mm,Square,Screen guard,X,SKU-1,Exact fit"),
  /Category must be/,
  "an unknown category is caught"
);
assert.throws(
  () => parseCatalogue(header + "Brand R,M1,1 mm,Square,Back cover,X,SKU-1,Exact fit\nBrand R,M2,1 mm,Square,Back cover,X,SKU-1,Exact fit"),
  /already used on line 2/,
  "a duplicate SKU is caught"
);
assert.throws(
  () => parseCatalogue(header + "Brand R,,1 mm,Square,Back cover,X,SKU-1,Exact fit"),
  /are required/,
  "a missing model name is caught"
);
assert.throws(() => parseCatalogue("Brand,Model\nBrand R,M1"), /missing column/, "a missing column is caught");
assert.equal(
  parseCatalogue("﻿" + header + "Brand R,M1,1 mm,Square,Back cover,X,SKU-1,Exact fit\r\n")[0].model,
  "M1",
  "an Excel BOM and CRLF line endings are tolerated"
);

// --- filtering ---
const all = filterModels(compatibilityDb, ALL_BRANDS, "");
assert.equal(all.length, compatibilityDb.length, "no filters returns everything");

assert.ok(
  filterModels(compatibilityDb, "Brand S", "").every((m) => m.brand === "Brand S"),
  "brand filter narrows to that brand"
);

// Search is case- and whitespace-insensitive, and matches brand as well as model.
assert.equal(filterModels(compatibilityDb, ALL_BRANDS, "  s24 ")[0].model, "Model S24");
assert.deepEqual(
  filterModels(compatibilityDb, ALL_BRANDS, "brand v").map((m) => m.brand),
  ["Brand V"]
);
assert.equal(filterModels(compatibilityDb, "Brand S", "V29").length, 0, "filters combine");
assert.equal(filterModels(compatibilityDb, ALL_BRANDS, "nope").length, 0, "no match is empty");

console.log(`ok — ${compatibilityDb.length} models from catalogue.csv, filters and validation`);
