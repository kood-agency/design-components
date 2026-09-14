import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(pkg.version === "2.0.0", `expected release version 2.0.0, got ${pkg.version}`);
assert(pkg.publishConfig?.access === "public", "publishConfig.access must remain public");
assert(pkg.files?.length === 1 && pkg.files[0] === "dist", "only dist may be published");
assert(pkg.exports?.["./globals.css"] === "./dist/globals.css", "globals.css export is missing");
assert(
  pkg.exports?.["./styles.css"] === "./dist/styles.css",
  "styles.css compatibility export is missing",
);
assert(
  !Object.values(pkg.exports ?? {}).includes("./src/styles/globals.css"),
  "raw source CSS must not ship",
);

for (const file of [
  "dist/index.js",
  "dist/index.cjs",
  "dist/index.d.ts",
  "dist/index.d.cts",
  "dist/globals.css",
  "dist/styles.css",
])
  assert(existsSync(resolve(root, file)), `missing publish artifact: ${file}`);
assert(
  readFileSync(resolve(root, "dist/globals.css")).equals(
    readFileSync(resolve(root, "dist/styles.css")),
  ),
  "globals.css and styles.css must be byte-identical",
);

const packed = JSON.parse(
  execFileSync("npm", ["pack", "--dry-run", "--json"], { cwd: root, encoding: "utf8" }),
)[0];
const files = new Set(packed.files.map((file) => file.path));
for (const file of [
  "dist/index.js",
  "dist/index.cjs",
  "dist/index.d.ts",
  "dist/index.d.cts",
  "dist/globals.css",
  "dist/styles.css",
  "package.json",
  "README.md",
])
  assert(files.has(file), `npm pack manifest is missing ${file}`);
assert(
  existsSync(resolve(root, "CHANGELOG.md")),
  "release changelog is missing from the repository",
);
assert(
  ![...files].some((file) => file.startsWith("src/")),
  "npm pack manifest must not include source files",
);
assert(packed.version === "2.0.0", `npm pack reports ${packed.version}, expected 2.0.0`);

console.log(
  JSON.stringify(
    { name: packed.name, version: packed.version, files: packed.files.length },
    null,
    2,
  ),
);
