import { resolve, relative } from "node:path";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { API } from "typescript/unstable/async";
import * as ts from "typescript/unstable/ast";

const ROOT = process.cwd();
const apiFiles = [
  "src/index.ts",
  "src/components/ui/button.tsx",
  "src/components/ui/input.tsx",
  "src/components/ui/select.tsx",
  "src/components/ui/tabs.tsx",
  "src/components/ui/card.tsx",
  "src/components/ui/table.tsx",
];

function extractModule(file) {
  const exported = new Set();
  const variants = {};
  const sizeUnions = new Set();
  const visit = (node) => {
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause))
      for (const item of node.exportClause.elements) exported.add(item.name.text);
    if (
      (ts.isFunctionDeclaration(node) ||
        ts.isClassDeclaration(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isVariableStatement(node)) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      if (ts.isVariableStatement(node)) {
        for (const d of node.declarationList.declarations)
          if (ts.isIdentifier(d.name)) exported.add(d.name.text);
      } else if (node.name) exported.add(node.name.text);
    }
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "cva"
    ) {
      const config = node.arguments?.[1];
      if (config && ts.isObjectLiteralExpression(config)) {
        const vp = config.properties.find(
          (p) =>
            ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === "variants",
        );
        if (vp && ts.isObjectLiteralExpression(vp.initializer))
          for (const variant of vp.initializer.properties) {
            if (
              ts.isPropertyAssignment(variant) &&
              ts.isObjectLiteralExpression(variant.initializer)
            ) {
              const name =
                ts.isIdentifier(variant.name) || ts.isStringLiteral(variant.name)
                  ? variant.name.text
                  : "unknown";
              variants[name] = variant.initializer.properties
                .map((p) =>
                  ts.isPropertyAssignment(p) &&
                  (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name))
                    ? p.name.text
                    : null,
                )
                .filter((v) => v !== null)
                .sort();
            }
          }
      }
    }
    if (ts.isUnionTypeNode(node) && node.types.every(ts.isLiteralTypeNode)) {
      const literals = node.types
        .map((t) => (ts.isStringLiteral(t.literal) ? t.literal.text : null))
        .filter((v) => v !== null);
      if (literals.length > 1) sizeUnions.add(literals.sort().join(" | "));
    }
    node.forEachChild(visit);
  };
  file.forEachChild(visit);
  return { exports: [...exported].sort(), variants, sizeUnions: [...sizeUnions].sort() };
}

async function run(fromHead) {
  const overlay = new Map();
  if (fromHead)
    for (const p of apiFiles)
      overlay.set(
        resolve(ROOT, p),
        spawnSync("git", ["show", `HEAD:${p}`], { cwd: ROOT, encoding: "utf8" }).stdout,
      );
  const api = new API(
    fromHead ? { cwd: ROOT, fs: { readFile: (f) => overlay.get(f) } } : { cwd: ROOT },
  );
  const snap = await api.updateSnapshot({ openProjects: [resolve(ROOT, "tsconfig.json")] });
  const project = snap.getProjects()[0];
  const modules = {};
  for (const p of apiFiles) {
    const file = await project.program.getSourceFile(resolve(ROOT, p));
    if (!file) throw new Error(`could not load ${p}`);
    modules[p] = extractModule(file);
  }
  const idx = await project.program.getSourceFile(resolve(ROOT, "src/index.ts"));
  const sym = await project.checker.getSymbolAtLocation(idx);
  modules["src/index.ts"].exports = (await project.checker.getExportsOfModule(sym))
    .map((s) => s.name)
    .sort();
  return { api, snap, result: { extractor: "typescript-compiler-api", modules } };
}

const a = await run(false);
const b = await run(true);
console.log("RESULT worktree index exports:", a.result.modules["src/index.ts"].exports.length);
console.log(
  "RESULT button variants:",
  JSON.stringify(a.result.modules["src/components/ui/button.tsx"].variants),
);
console.log(
  "RESULT button exports:",
  JSON.stringify(a.result.modules["src/components/ui/button.tsx"].exports),
);
console.log("RESULT head.equals.worktree:", JSON.stringify(b.result) === JSON.stringify(a.result));
console.log("RESULT glass:", JSON.stringify(a.result).includes("glass"));
console.log("RESULT head glass:", JSON.stringify(b.result).includes("glass"));
