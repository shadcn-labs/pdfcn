# Commands

`package.json` is the source of truth for scripts and tool versions; this page adds what each
command is for, what success looks like, and the workflows around them.

## Setup

Requirements: the Node and pnpm versions in `package.json` (`engines`, and `packageManager` for
the exact pnpm, which Corepack picks up).

```bash
git clone https://github.com/shadcn-labs/pdfcn.git   # contributors: clone your fork instead
cd pdfcn
pnpm install        # also installs the lefthook git hook and generates fumadocs sources
pnpm dev            # docs site at http://localhost:3000
```

Setup is done when `http://localhost:3000/docs` loads and
`http://localhost:3000/api/pdf/takumi?name=invoice-classic` returns a PDF.

## Scripts (run from the repo root)

| Command               | Use it to                                                          |
| --------------------- | ------------------------------------------------------------------ |
| `pnpm dev`            | Serve docs, previews, and `/api/pdf/*` on port 3000                |
| `pnpm build`          | Production build (registry first); CI runs it before `typecheck`   |
| `pnpm typecheck`      | Type errors; success prints `Tasks: 1 successful, 1 total`         |
| `pnpm check`          | What CI enforces; success prints `Found 0 warnings and 0 errors.`  |
| `pnpm fix`            | Auto-fix lint and formatting, including Markdown and MDX tables    |
| `pnpm registry:build` | Regenerate `apps/web/public/r/` and validate every install closure |

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

## Skill scripts

In this skill's `scripts/` folder; each runs from anywhere inside the repo.

| Script                                       | Checks or does                                                                                                  | Passes when                           |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `check-registration.sh <name>`               | Every registration site for both bases, `registryDependencies` against actual imports, generated JSON freshness | Last line `all registration sites ok` |
| `render-check.sh <name> [server-url]`        | Renders both bases, prints page counts, warns on a blank or footer-only last page and on byte-identical renders | Exit code 0                           |
| `restore-registry-churn.sh <name> [<name>…]` | Restores every changed `public/r` file except the named items and `public/r/registry.json`                      | Only your files remain changed        |

`render-check.sh` needs a running dev server (default `http://localhost:3000`) and Poppler
(`pdfinfo`, `pdftotext`, `pdftoppm`; `brew install poppler` or `apt install poppler-utils`) for
page counts and PNGs. It writes PDFs and PNGs to `$TMPDIR/pdfcn-render/`. Look at the PNGs: the
script catches overflow, and your eyes catch misaligned columns, clipped text, and style drift.

## Troubleshooting

Problems that show no error (stale previews, generated agent files) are in `SKILL.md`,
"Silent gotchas".

| Error or symptom                                                 | Cause and fix                                                                                                              |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Another next dev server is already running`                     | Next allows one dev server per app directory. Use the running one (its URL is printed), or stop the printed PID.           |
| `Attempted to call the default export of … from the server`      | The example has `"use client"`; examples are server-rendered (see "Example file" in [components.md](components.md)).       |
| `Unknown demo: <name>` (404 from `/api/pdf`)                     | The example is missing from `demos.<base>` in `examples/__index__.ts`.                                                     |
| `<Component> is not defined` (500 from `/api/pdf`)               | A JSX element is used without its import.                                                                                  |
| `Type 'string[]' is not assignable to type 'ListItem[]'`         | `PdfList` wants `items={values.map((text) => ({ text }))}`.                                                                |
| Lint: `sort-keys`, `no-negated-condition`, formatting            | Run `pnpm fix`; sort remaining keys by hand and flip `a !== b ? x : y` to `a === b ? y : x`.                               |
| `registry:build` fails with `Unexpected token` or `Expected ','` | `registry.json` is invalid JSON; validate with `python3 -m json.tool apps/web/registry.json`.                              |
| `registry:build`: `<item>: <file> imports missing <path>`        | The item imports a pdfcn component missing from its `registryDependencies` (see "Building" in [registry.md](registry.md)). |
| `registry:build`: `<item>: <file> requires undeclared package`   | Add the npm package to the item's `dependencies`.                                                                          |
| Commit fails in the hook with "No files found to lint"           | Every hook-matched staged file is JSON, which oxlint does not lint; commit it together with a `.ts`/`.tsx` change.         |
