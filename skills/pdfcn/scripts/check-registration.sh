#!/usr/bin/env bash
# Check that a pdfcn component or block is registered at every site, for both bases.
# Usage: check-registration.sh <name>   (run from anywhere inside the pdfcn repo)
# Exits 0 when every line reads "ok", 1 otherwise.
set -euo pipefail

name="${1:?usage: check-registration.sh <name>}"
root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
web="$root/apps/web"
if [ -z "$root" ] || [ ! -f "$web/registry.json" ]; then
  echo "apps/web/registry.json not found: run this inside the pdfcn repo" >&2
  exit 2
fi

exec node - "$web" "$name" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const [web, name] = process.argv.slice(2);
const exists = (p) => fs.existsSync(path.join(web, p));
const read = (p) => fs.readFileSync(path.join(web, p), "utf8");
// The registry build rewrites `@/registry/...` import paths to install targets, so compare
// sources with every `@/` module specifier masked, and with line endings normalised.
const normalize = (text) =>
  text
    .replace(/\r\n/g, "\n")
    .replace(/((?:from|import)\s*)(["'])@\/[^"']+\2/g, '$1"@/"');
const bases = ["takumi", "forme"];
const kind = bases.some((b) => exists(`registry/bases/${b}/blocks/${name}`))
  ? "blocks"
  : "components";

let failures = 0;
const report = (ok, label) => {
  console.log(`  ${ok ? "ok  " : "MISS"}  ${label}`);
  if (!ok) failures += 1;
};

const registry = JSON.parse(read("registry.json"));
const index = read("examples/__index__.ts");
const publicIndex = exists("public/r/registry.json")
  ? JSON.parse(read("public/r/registry.json"))
  : { items: [] };

console.log(`${name} (${kind === "blocks" ? "block" : "component"})`);

for (const base of bases) {
  console.log(`\n${base}`);
  const dir = `registry/bases/${base}/${kind}/${name}`;
  report(exists(`${dir}/${name}.tsx`), `source ${dir}/${name}.tsx`);

  const item = registry.items.find((i) => i.name === `${base}/${name}`);
  report(Boolean(item), `registry.json item "${base}/${name}"`);
  if (item) {
    const listed = new Set(item.files.map((f) => f.path));
    const missing = [...listed].filter((p) => !exists(p));
    report(missing.length === 0, `registry.json file paths exist${missing.length ? `: ${missing.join(", ")}` : ""}`);

    const onDisk = exists(dir)
      ? fs.readdirSync(path.join(web, dir)).filter((f) => /\.tsx?$/.test(f)).map((f) => `${dir}/${f}`)
      : [];
    const unlisted = onDisk.filter((p) => !listed.has(p));
    report(unlisted.length === 0, `every source file listed in registry.json${unlisted.length ? `: add ${unlisted.join(", ")}` : ""}`);

    const imported = new Set(["utils"]);
    const pattern = new RegExp(`@/registry/bases/${base}/components/([a-z0-9-]+)/`, "g");
    for (const p of listed) {
      if (exists(p)) for (const m of read(p).matchAll(pattern)) imported.add(m[1]);
    }
    const declared = new Set((item.registryDependencies ?? []).map((d) => d.replace(`@pdfcn/${base}/`, "")));
    const add = [...imported].filter((d) => !declared.has(d));
    const remove = [...declared].filter((d) => !imported.has(d));
    report(
      add.length === 0 && remove.length === 0,
      `registryDependencies match imports${add.length ? `; add ${add.join(", ")}` : ""}${remove.length ? `; remove ${remove.join(", ")}` : ""}`
    );
  }

  const example = `examples/${base}/${name}.tsx`;
  report(exists(example), `example ${example}`);
  if (exists(example)) report(!read(example).includes('"use client"'), `example is server-callable (no "use client")`);
  report(index.includes(`"@/examples/${base}/${name}"`), "examples/__index__.ts imports the example");
  report(new RegExp(`^\\s+(?:"${name}"|${name}): ${base}_`, "m").test(index), `examples/__index__.ts has the demos.${base} key`);

  const doc = `content/docs/${kind}/${base}/${name}.mdx`;
  report(exists(doc), `docs ${doc}`);
  const meta = `content/docs/${kind}/${base}/meta.json`;
  report(exists(meta) && read(meta).includes(`"${name}"`), `${meta} lists "${name}"`);

  const built = `public/r/${base}/${name}.json`;
  report(exists(built), `generated ${built}`);
  if (exists(built)) {
    const stale = (JSON.parse(read(built)).files ?? [])
      .filter((f) => exists(f.path) && normalize(f.content ?? "") !== normalize(read(f.path)))
      .map((f) => f.path);
    report(stale.length === 0, `generated JSON matches the source${stale.length ? ` (stale: ${stale.join(", ")}; run pnpm registry:build)` : ""}`);
  }
  report(publicIndex.items.some((i) => i.name === `${base}/${name}`), `public/r/registry.json lists "${base}/${name}"`);
}

if (kind === "blocks") {
  console.log("\nblock lists");
  report(read("examples/preview-config.tsx").includes(`"${name}"`), "examples/preview-config.tsx BLOCK_NAMES");
  report(read("components/web-mcp/pdf-tool.tsx").includes(`"${name}"`), "components/web-mcp/pdf-tool.tsx BLOCK_NAMES");
}

console.log(failures === 0 ? "\nall registration sites ok" : `\n${failures} check(s) failed`);
process.exit(failures === 0 ? 0 : 1);
NODE
