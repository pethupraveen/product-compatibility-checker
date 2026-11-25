import csv from "./catalogue.csv?raw";
import { parseCatalogue, buildBrands } from "./compatibility.js";

export const compatibilityDb = parseCatalogue(csv);
export const brands = buildBrands(compatibilityDb);
export { filterModels, ALL_BRANDS } from "./compatibility.js";
