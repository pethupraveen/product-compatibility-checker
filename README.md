# Product Compatibility Checker

Single-page lookup for mobile-accessory fitment: pick a handset model and see which
back cover and tempered glass SKUs fit it, which are shared with a neighbouring model,
and which are still in sampling.

React + Vite + Tailwind. The catalogue in `src/data/compatibility.js` is placeholder
data — brand names, dimensions and SKU codes are not real.

```bash
npm run dev     # local dev server
npm test        # filter logic self-check
npm run build   # production build to dist/
```

Deployed on Vercel from `main`.
