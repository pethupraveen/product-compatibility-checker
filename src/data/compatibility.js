// Placeholder catalogue: brand/model names, dimensions and SKU codes are not real.
export const compatibilityDb = [
  {
    brand: "Brand R",
    model: "Model A13 Pro",
    dimensions: "162.4 × 75.7 × 8.2 mm",
    cameraCutout: "Square module, top-left",
    backCover: [
      { type: "Matte TPU", sku: "BC-RL13P-MT", fit: "Exact fit" },
      { type: "Armour hybrid", sku: "BC-RL13P-AR", fit: "Exact fit" },
    ],
    temperedGlass: [
      { type: "9H full cover", sku: "TG-RL13P-9H", fit: "Exact fit" },
      { type: "Privacy", sku: "TG-RL13P-PRV", fit: "Exact fit" },
    ],
  },
  {
    brand: "Brand S",
    model: "Model S24",
    dimensions: "147.0 × 70.6 × 7.6 mm",
    cameraCutout: "Vertical triple lens, top-left",
    backCover: [{ type: "Clear TPU", sku: "BC-SG24-CLR", fit: "Exact fit" }],
    temperedGlass: [
      { type: "Privacy", sku: "TG-SG24-PRV", fit: "Exact fit" },
      { type: "9H full cover", sku: "TG-SG24-9H", fit: "Shared with Model S23" },
    ],
  },
  {
    brand: "Brand S",
    model: "Model F15",
    dimensions: "160.1 × 74.5 × 8.0 mm",
    cameraCutout: "Vertical dual lens, top-left",
    backCover: [{ type: "Clear TPU", sku: "BC-SF15-CLR", fit: "Sample stage" }],
    temperedGlass: [{ type: "9H full cover", sku: "TG-SF15-9H", fit: "Sample stage" }],
  },
  {
    brand: "Brand M",
    model: "Model E70",
    dimensions: "161.2 × 73.1 × 7.9 mm",
    cameraCutout: "Oval module, top-left",
    backCover: [
      { type: "Leather finish", sku: "BC-MT70-LTH", fit: "Exact fit" },
      { type: "Matte TPU", sku: "BC-MT70-MT", fit: "Exact fit" },
    ],
    temperedGlass: [{ type: "9H full cover", sku: "TG-MT70-9H", fit: "Exact fit" }],
  },
  {
    brand: "Brand M",
    model: "Model G84",
    dimensions: "160.0 × 74.4 × 7.6 mm",
    cameraCutout: "Vertical dual lens, top-left",
    backCover: [{ type: "Matte TPU", sku: "BC-MG84-MT", fit: "Sample approved" }],
    temperedGlass: [{ type: "9H full cover", sku: "TG-MG84-9H", fit: "In development" }],
  },
  {
    brand: "Brand V",
    model: "Model V29",
    dimensions: "164.2 × 74.4 × 7.5 mm",
    cameraCutout: "Round module, centre-top",
    backCover: [{ type: "TPU soft", sku: "BC-VV29-TPU", fit: "Exact fit" }],
    temperedGlass: [{ type: "Full cover", sku: "TG-VV29-FUL", fit: "Exact fit" }],
  },
  {
    brand: "Brand O",
    model: "Model N12",
    dimensions: "163.3 × 75.3 × 8.2 mm",
    cameraCutout: "Round module, top-left",
    backCover: [{ type: "Armour hybrid", sku: "BC-OP12-ARM", fit: "Exact fit" }],
    temperedGlass: [{ type: "Matte 9H", sku: "TG-OP12-MAT", fit: "Exact fit" }],
  },
  {
    brand: "Brand R",
    model: "Model A36",
    dimensions: "159.9 × 73.3 × 7.9 mm",
    cameraCutout: "Square module, top-left",
    backCover: [{ type: "Matte TPU", sku: "BC-RA36-MT", fit: "Exact fit" }],
    temperedGlass: [{ type: "9H full cover", sku: "TG-RA36-9H", fit: "Shared with Model A35" }],
  },
];

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

export const brands = [ALL_BRANDS, ...new Set(compatibilityDb.map((m) => m.brand))];
