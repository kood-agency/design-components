// shadcn add/update가 만든 "@/...", "cn" 임포트를 상대경로로 고친다.
// 외부 번들러 설정 없이 tsup/tsc/storybook이 바로 해석하게 유지하기 위함.
// 사용법: pnpm fix:ui
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";

const SRC = new URL("../src/", import.meta.url).pathname;

function* walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.tsx?$/.test(f)) yield p;
  }
}

function toRelative(fromDir, targetAbs) {
  const cands = [targetAbs, targetAbs + ".ts", targetAbs + ".tsx"];
  const real = cands.find((c) => existsSync(c)) ?? targetAbs + ".ts";
  let rel = relative(fromDir, real).split(sep).join("/");
  rel = rel.replace(/\.tsx?$/, "");
  return rel.startsWith(".") ? rel : "./" + rel;
}

let n = 0;
for (const file of walk(SRC)) {
  const text = readFileSync(file, "utf8");
  const out = text
    .replace(
      /from\s+(['"])@\/(.*?)\1/g,
      (_, q, rest) => `from ${q}${toRelative(dirname(file), join(SRC, rest))}${q}`,
    )
    .replace(
      /from\s+(['"])cn\1/g,
      (_, q) => `from ${q}${toRelative(dirname(file), join(SRC, "lib/utils"))}${q}`,
    );
  if (out !== text) {
    writeFileSync(file, out);
    n++;
  }
}
console.log(`fixed ${n} files`);
