import assert from "node:assert/strict";
import { compatibilityDb, filterModels, ALL_BRANDS } from "../src/data/compatibility.js";

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

console.log("ok — compatibility filter");
