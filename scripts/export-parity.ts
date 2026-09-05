/**
 * Compare exported symbol names of src/shadcn/<name>.tsx vs src/components/<name>.tsx
 * using TypeScript's checker.getExportsOfModule. Differences are allowed only when
 * a todo says 'export addition' or 'drop variant'.
 *
 * Usage:
 *   bun scripts/export-parity.ts input textarea label checkbox radio-group switch
 */
import ts from "typescript";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const tsconfigPath = resolve(ROOT, "tsconfig.json");

function loadCompilerOptions(): ts.CompilerOptions {
  const raw = readFileSync(tsconfigPath, "utf8");
  const parsed = ts.parseConfigFileTextToJson(tsconfigPath, raw);
  const cfg = ts.parseJsonConfigFileContent(parsed.config, ts.sys, ROOT);
  return { ...cfg.options, noEmit: true, skipLibCheck: true };
}

function exportNames(program: ts.Program, filePath: string): string[] {
  const source = program.getSourceFile(filePath);
  if (!source) throw new Error(`no source file: ${filePath}`);
  const checker = program.getTypeChecker();
  const sym = checker.getSymbolAtLocation(source);
  if (!sym) throw new Error(`no symbol: ${filePath}`);
  return checker
    .getExportsOfModule(sym)
    .map((s) => s.getName())
    .sort();
}

const names = process.argv.slice(2);
if (names.length === 0) {
  console.error("usage: bun scripts/export-parity.ts <name>...");
  process.exit(2);
}

const files: string[] = [];
for (const name of names) {
  const a = resolve(ROOT, "src/shadcn", `${name}.tsx`);
  const b = resolve(ROOT, "src/components", `${name}.tsx`);
  if (!existsSync(a)) throw new Error(`missing ${a}`);
  if (!existsSync(b)) throw new Error(`missing ${b}`);
  files.push(a, b);
}

const options = loadCompilerOptions();
const program = ts.createProgram(files, options);
const diagnostics = ts
  .getPreEmitDiagnostics(program)
  .filter((d) => d.category === ts.DiagnosticCategory.Error);
if (diagnostics.length) {
  for (const d of diagnostics) {
    const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    const file = d.file?.fileName ?? "";
    console.error(`tsc: ${file}: ${msg}`);
  }
}

let failed = false;
for (const name of names) {
  const a = resolve(ROOT, "src/shadcn", `${name}.tsx`);
  const b = resolve(ROOT, "src/components", `${name}.tsx`);
  const left = exportNames(program, a);
  const right = exportNames(program, b);
  const onlyLeft = left.filter((n) => !right.includes(n));
  const onlyRight = right.filter((n) => !left.includes(n));
  if (onlyLeft.length === 0 && onlyRight.length === 0) {
    console.log(`OK ${name}: ${JSON.stringify(left)}`);
  } else {
    failed = true;
    console.log(
      `DIFF ${name}: shadcn=${JSON.stringify(left)} components=${JSON.stringify(right)} onlyShadcn=${JSON.stringify(onlyLeft)} onlyComponents=${JSON.stringify(onlyRight)}`,
    );
  }
}

process.exit(failed ? 1 : 0);
