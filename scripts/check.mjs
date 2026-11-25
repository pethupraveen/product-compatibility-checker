import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parseCatalogue, filterModels, ALL_BRANDS, buildBrands } from "../src/data/compatibility.js";

const HEADER = "Brand,Model,Dimensions,Camera cutout,Category,Type,SKU,Fit\n";

// --- behaviour is checked against a fixture, so editing catalogue.csv never breaks the build ---
const fixture =
  HEADER +
  'Brand R,Model A13 Pro,162.4 mm,"Square module, top-left",Back cover,Matte TPU,BC-1,Exact fit\n' +
  'Brand R,Model A13 Pro,162.4 mm,"Square module, top-left",Back cover,Armour,BC-2,Exact fit\n' +
  'Brand R,Model A13 Pro,162.4 mm,"Square module, top-left",Tempered glass,9H,TG-1,Exact fit\n' +
  "Brand R,MODEL a13 pro,,,Tempered glass,Privacy,TG-2,Exact fit\n" +
  "Brand V,Model V29,164.2 mm,Round,Back cover,TPU soft,BC-3,Exact fit\n";

const db = parseCatalogue(fixture);
assert.equal(db.length, 2, "rows group into one entry per handset");

const [a13] = db;
assert.equal(a13.cameraCutout, "Square module, top-left", "quoted fields keep their commas");
assert.equal(a13.model, "Model A13 Pro", "the first spelling of a model name is the one shown");
assert.equal(a13.backCover.length, 2, "rows of one category collect onto the model");
assert.deepEqual(
  a13.temperedGlass.map((g) => g.sku),
  ["TG-1", "TG-2"],
  "a differently-cased model name is the same handset, not a second one"
);
assert.deepEqual(buildBrands(db), [ALL_BRANDS, "Brand R", "Brand V"], "brands keep file order");

// --- a bad CSV is rejected rather than half-loaded ---
assert.throws(
  () => parseCatalogue(HEADER + "Brand R,M1,,,Screen guard,X,SKU-1,Exact fit"),
  /Category must be/,
  "an unknown category is caught"
);
assert.throws(
  () => parseCatalogue(HEADER + "Brand R,M1,,,Back cover,X,SKU-1,Fit\nBrand R,M2,,,Back cover,X,SKU-1,Fit"),
  /already used on line 2/,
  "a duplicate SKU is caught"
);
assert.throws(
  () => parseCatalogue(HEADER + "Brand R,,,,Back cover,X,SKU-1,Exact fit"),
  /are required/,
  "a missing model name is caught"
);
assert.throws(() => parseCatalogue("Brand,Model\nBrand R,M1"), /missing column/, "a missing column is caught");
assert.equal(
  parseCatalogue("﻿" + HEADER + "Brand R,M1,,,Back cover,X,SKU-1,Exact fit\r\n")[0].model,
  "M1",
  "an Excel BOM and CRLF line endings are tolerated"
);

// --- filtering ---
assert.equal(filterModels(db, ALL_BRANDS, "").length, db.length, "no filters returns everything");
assert.ok(
  filterModels(db, "Brand R", "").every((m) => m.brand === "Brand R"),
  "brand filter narrows to that brand"
);
// Search is case- and whitespace-insensitive, and matches brand as well as model.
assert.equal(filterModels(db, ALL_BRANDS, "  a13 ")[0].model, "Model A13 Pro");
assert.deepEqual(filterModels(db, ALL_BRANDS, "brand v").map((m) => m.brand), ["Brand V"]);
assert.equal(filterModels(db, "Brand R", "V29").length, 0, "filters combine");
assert.equal(filterModels(db, ALL_BRANDS, "nope").length, 0, "no match is empty");

// --- the real catalogue parses and is usable ---
const csv = readFileSync(fileURLToPath(new URL("../src/data/catalogue.csv", import.meta.url)), "utf8");
const real = parseCatalogue(csv); // throws, and so fails the build, on a bad edit
assert.ok(real.length, "catalogue.csv holds at least one model");
assert.ok(
  real.every((m) => m.brand && m.model && m.backCover.length + m.temperedGlass.length),
  "every model has a brand, a model name and at least one accessory"
);

const skus = real.flatMap((m) => [...m.backCover, ...m.temperedGlass]);
console.log(`ok — ${real.length} models / ${skus.length} SKUs from catalogue.csv, filters and validation`);
