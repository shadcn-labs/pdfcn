# Commands

`package.json` is the source of truth for scripts; this page adds what each one is for and the
workflows around them.

## Setup

Requirements: Node `>=20.9.0` and pnpm `>=10` (the repo pins `pnpm@10.28.2` through
`packageManager`, so Corepack picks the right version).

```bash
git clone https://github.com/shadcn-labs/pdfcn.git   # contributors: clone your fork instead
cd pdfcn
pnpm install        # also installs the lefthook git hook and generates fumadocs sources
pnpm dev            # docs site at http://localhost:3000
```

Setup is done when `http://localhost:3000/docs` loads and
`http://localhost:3000/api/pdf/takumi?name=invoice-classic` returns a PDF.

## Scripts (run from the repo root)

| Command               | Runs                                       | Use it to                                                         |
| --------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| `pnpm dev`            | `turbo run dev --filter=web` → `next dev`  | Serve docs, previews, and `/api/pdf/*` on port 3000               |
| `pnpm build`          | `pnpm registry:build && next build` in web | Production build; CI runs it before `typecheck`                   |
| `pnpm start`          | `next start`                               | Serve a production build                                          |
| `pnpm typecheck`      | `tsc --noEmit` in web                      | Type errors; success prints `Tasks: 1 successful, 1 total`        |
| `pnpm check`          | `ultracite check` (oxlint + oxfmt)         | What CI enforces; success prints `Found 0 warnings and 0 errors.` |
| `pnpm fix`            | `ultracite fix`                            | Auto-fix lint and formatting, including Markdown and MDX tables   |
| `pnpm registry:build` | `shadcn build` in web                      | Regenerate `apps/web/public/r/` after any registry source change  |

The pre-commit hook runs `pnpm fix` on staged `js/jsx/ts/tsx/json/jsonc/css` files. It does not
touch `.md`/`.mdx`, but `pnpm check` does, so run `pnpm fix` after editing docs.

To serve on another port, run Next directly: `cd apps/web && pnpm exec next dev -p 3001`.

## Useful URLs (dev server)

| URL                                                | Returns                                         |
| -------------------------------------------------- | ----------------------------------------------- |
| `/docs/components/<base>/<name>`                   | Component docs page with live preview           |
| `/docs/blocks/<base>/<name>`                       | Block docs page with live preview               |
| `/api/pdf/<base>?name=<name>`                      | The example rendered as a PDF                   |
| `/api/pdf/<base>?name=<name>&format=document`      | The serialized document tree as JSON            |
| `/llms.md/docs/<section>/<base>/<name>/content.md` | The page as Markdown (what "Copy Page" fetches) |

## Render check

Run after every visual change, on both bases. It needs Poppler (`pdfinfo`, `pdftotext`,
`pdftoppm`; `brew install poppler` or `apt install poppler-utils`).

```bash
for base in takumi forme; do
  curl -s -o /tmp/$base.pdf -w "$base %{http_code}\n" \
    "http://localhost:3000/api/pdf/$base?name=<name>"
  pdfinfo /tmp/$base.pdf | grep Pages
  pdftotext -layout /tmp/$base.pdf - | head -40     # content and column alignment per page
  pdftoppm -png -r 100 /tmp/$base.pdf /tmp/$base    # one PNG per page to look at
done
```

The check passes when both return `200`, the page count matches the design, the last page is not
blank or footer-only, text sits in the intended columns, and the PNGs show no clipped or
overlapping content. A non-PDF body (`Syntax Error` from `pdfinfo`) means the route returned an
error message: read it with `curl -s "<url>"`.

## Troubleshooting

| Symptom                                                                        | Cause and fix                                                                                            |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| The PDF did not change after an edit (byte-identical to the previous download) | The dev server serves a cached route module. Restart `next dev`.                                         |
| A new docs page returns 404                                                    | fumadocs picked up the page list at startup. Restart `next dev`.                                         |
| `Another next dev server is already running`                                   | Next 16 allows one dev server per app directory. Use the running one, or stop the printed PID.           |
| `Attempted to call the default export of … from the server`                    | The example has `"use client"`. Remove it; examples are server-rendered.                                 |
| `Unknown demo: <name>` (404 from `/api/pdf`)                                   | The example is missing from `demos.<base>` in `examples/__index__.ts`.                                   |
| `Type 'string[]' is not assignable to type 'ListItem[]'`                       | `PdfList` wants `items={values.map((text) => ({ text }))}`.                                              |
| Lint: `sort-keys`, `no-negated-condition`, formatting                          | Run `pnpm fix`; sort remaining keys by hand and flip `a !== b ? x : y` to `a === b ? y : x`.             |
| `shadcn build` fails with `Unexpected token` or `Expected ','`                 | `registry.json` is invalid JSON; validate with `python3 -m json.tool apps/web/registry.json`.            |
| Commit fails in the hook with "No files found to lint"                         | Every hook-matched staged file is JSON, which oxlint does not lint; stage it with a `.ts`/`.tsx` change. |
| `apps/web/AGENTS.md` and `apps/web/CLAUDE.md` appear as untracked              | Written by `next dev`. Leave them out of commits.                                                        |
