# Product Compatibility Checker

Single-page lookup for mobile-accessory fitment: pick a handset model and see which
back cover and tempered glass SKUs fit it, which are shared with a neighbouring model,
and which are still in sampling.

React + Vite + Tailwind. The catalogue lives in `src/data/catalogue.csv`.

```bash
npm run dev     # local dev server
npm test        # catalogue validation + filter self-check
npm run build   # validate, then production build to dist/
```

## Updating the catalogue

`src/data/catalogue.csv` is the single source of truth. Open it in Excel, edit, save,
commit and push — Vercel rebuilds `main` and the change is live.

| Column | Notes |
| --- | --- |
| `Brand`, `Model` | Required. Rows sharing both are grouped into one handset. |
| `Dimensions`, `Camera cutout` | Taken from the handset's **first** row; later rows ignore them. |
| `Category` | Must be `Back cover` or `Tempered glass`. |
| `Type`, `Fit` | Free text, e.g. `Matte TPU` / `Shared with Model A35`. |
| `SKU` | Required, and must be unique across the whole file. |

One row per SKU, so a handset with two covers and one glass takes three rows. Brands
appear in the dropdown in the order they first show up in the file.

Save from Excel as **CSV UTF-8**, not plain `CSV` — plain CSV mangles the `×` in the
dimensions column.

A malformed file fails `npm run build` with the offending line number, so a bad edit
stops at the Vercel build instead of reaching the live site.

Deployed on Vercel from `main`.
