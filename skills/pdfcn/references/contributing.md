# Contributing

`CONTRIBUTING.md` at the repo root is the policy; this page turns it into steps and adds the
conventions maintainers apply in review.

## 1. Pick and claim an issue

Every PR is tied to an issue. Before writing code:

```bash
gh issue view <n> --repo shadcn-labs/pdfcn --comments          # read the spec and the thread
gh pr list --repo shadcn-labs/pdfcn --state open --search "<n>" # look for competing work
gh issue comment <n> --repo shadcn-labs/pdfcn --body "I would like to work on this issue."
```

The step is done when the issue has your comment and no one else has claimed it or opened a PR.
If there is no issue, open one from the templates first. For non-trivial changes (a new base,
registry layout changes), wait for a maintainer to agree on the direction.

## 2. Branch

Fork `shadcn-labs/pdfcn`, then branch from an up-to-date `main`:

```bash
git fetch upstream main            # `upstream` = shadcn-labs/pdfcn; `origin` = your fork
git checkout -b feat/<name>-block upstream/main
```

Branch names seen in merged PRs: `feat/<name>-block`, `fix/<topic>`, `style/<topic>`.

## 3. Implement

Follow [components.md](components.md) or [blocks.md](blocks.md), including the registration
checklist, for **both** bases, even when the issue calls the second base a follow-up. The docs
base switcher links each page to its twin, so a single-base item leaves a 404 in the docs.

## 4. Verify

```bash
pnpm fix && pnpm check && pnpm typecheck && pnpm registry:build
```

Then run the render check in [commands.md](commands.md) for both bases and restore unrelated
`public/r` churn ([registry.md](registry.md), "Building").

## 5. Commit

Sign off every commit (DCO; the `Signed-off-by` line must match the author):

```bash
git commit -s -m "feat(registry): add receipt block for takumi"
git commit --amend -s --no-edit     # forgot on the last commit
git rebase --signoff main           # forgot on several
```

Split the work into commits that each review on their own, in dependency order. For a new block:

1. `feat(registry): add <name> block for takumi`: the Takumi source folder.
2. `feat(registry): add <name> block for forme`: the Forme source folder.
3. `feat(registry): register <name> and add previews`: `registry.json`, examples,
   `examples/__index__.ts`, `preview-config.tsx`, `pdf-tool.tsx`, both docs `meta.json`, and the
   generated `public/r` files. This commit contains `.ts`/`.tsx` files, so the pre-commit hook
   accepts the JSON in it (a JSON-only commit fails the hook).
4. `docs: add <name> pages`: the two `.mdx` files (the hook skips `.mdx`).

Other prefixes in use: `fix(<scope>): …`, `style(registry): …` (visual changes with no API
change), `docs: …`. Keep the message about what changed and why, and keep tool or assistant
attributions out of commits and PR text.

## 6. Open the pull request

Push to your fork and open the PR against `shadcn-labs/pdfcn:main`. The title uses the same
conventional format as the commits, for example `feat(registry): add receipt block`. Fill in
`.github/pull_request_template.md`:

```markdown
### Summary

Closes #<n>. What the change does and the decisions a reviewer should know
(for example "props match the issue interface; also accepts `data={…}`").

### Validation

- `pnpm check`: 0 warnings, 0 errors
- `pnpm typecheck`: passed
- `pnpm registry:build`: regenerated `public/r/<base>/<name>.json`
- Rendered `/api/pdf/takumi` and `/api/pdf/forme`: <n> page(s) each, no overflow

### Checklist

- [x] I linked an issue with prior discussion confirming this change is wanted
- [x] I ran the relevant checks from CONTRIBUTING.md
- [x] I added tests and documentation where relevant
- [x] I ran `pnpm check` and `pnpm typecheck` successfully
```

## What reviewers look for

- One purpose per PR. Unrelated fixes, refactors, and formatting-only churn go in their own PR,
  and only when a maintainer wants them.
- Props that match the issue's interface, both bases, docs with a working preview, and a registry
  entry.
- The house visual style (see "Layout rules" in [blocks.md](blocks.md)); `invoice-classic` is the
  benchmark.
- A clean render: the intended page count and no stray pages.

## After review or merge

- Review feedback goes on the same branch as new commits; the PR updates on push.
- Once a PR is merged, later pushes to its branch no longer reach `main`. Check with
  `gh pr view <n> --json state` before pushing a follow-up, and put follow-ups on a new branch from
  the latest `main` (cherry-pick the commits) in a new PR that references the original.
