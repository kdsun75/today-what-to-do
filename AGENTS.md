# Project guide

- `src/components`: shared UI, `src/data`: sample events, `src/store`: shared filters.
- `src/features/*`: independently extendable feature boundaries.
- Run: `npm install`, then `npm run dev`.
- Verify: `npm test`, `npm run typecheck`, `npm run build`.
- Features should avoid modifying files outside their own folder whenever possible. Add integration contracts inside the feature folder first.
