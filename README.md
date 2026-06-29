# GraphQL → TypeScript SDK Pipeline — interactive explainer

An interactive, single-page site explaining how **Fern** turns a GraphQL schema into a
fully-typed TypeScript SDK, and how that compares to Fern's OpenAPI SDK generator and to
the GraphQL codegen tools on the market.

Sections:

1. **Hero** — the one-line pitch and an animated pipeline flow.
2. **Pipeline** — the four stages (schema load/parse → GraphQL→IR → IR merge → TS gen),
   each a clickable card that expands with detail and a code/JSON snippet.
3. **Playground** — toggle a field selection and watch the generated GraphQL document and
   the inferred TypeScript result type update live (runs entirely in the browser).
4. **Feature gallery** — flip cards for field selection, `Result<T,S>`, the `{ data, errors }`
   envelope, auto-pagination, subscriptions, `raw()`, custom scalars, and more.
5. **Comparison** — vs. Fern's OpenAPI SDK and vs. graphql-code-generator / genql / Apollo /
   vendor SDKs.
6. **Multi-language outlook** — one schema → one IR → many language emitters.

## Stack

React 19 · Vite 6 · Tailwind CSS v4 · Framer Motion · Shiki

## Develop

```bash
pnpm install
pnpm dev          # local dev server
pnpm build        # type-check + production build to dist/
pnpm preview      # preview the production build
```

For a local build served from the root (instead of the GitHub Pages subpath), set
`BASE_PATH=/`:

```bash
BASE_PATH=/ pnpm build && pnpm preview
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages. Enable **Settings → Pages → Source: GitHub Actions** once,
and the live site appears at `https://cadesark.github.io/graphql-sdk-site/`.
