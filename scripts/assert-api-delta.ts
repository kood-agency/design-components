import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

type ModuleApi = {
  exports: string[];
  variants: Record<string, string[]>;
  sizeUnions: string[];
};

type ApiSnapshot = { modules: Record<string, ModuleApi> };
type Delta = {
  exports: Record<string, { added: string[]; removed: string[] }>;
  variants: Record<string, { added: string[]; removed: string[] }>;
  sizeUnions: Record<string, { added: string[]; removed: string[] }>;
  lightTokens: Record<string, { from?: string; to?: string }>;
};

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const EMPTY_DELTA: Delta = {
  exports: {},
  variants: {},
  sizeUnions: {},
  lightTokens: {},
};
const EXPECTED: Record<string, Delta> = {
  A1: EMPTY_DELTA,
  A2: {
    exports: {},
    variants: {
      "src/components/ui/tabs.tsx:variant": { added: ["pill"], removed: [] },
    },
    sizeUnions: {},
    lightTokens: {},
  },
  B3: EMPTY_DELTA,
  B5: EMPTY_DELTA,
  B6: EMPTY_DELTA,
  B2: {
    exports: {},
    variants: {},
    sizeUnions: {},
    lightTokens: {
      "--radius": { from: "8px", to: "10px" },
      "--background": { from: "#f6f8fb", to: "#f3f5f8" },
      "--foreground": { from: "#0a1724", to: "#171c24" },
      "--foreground-muted": { from: "#394b5e", to: "#454f5c" },
      "--muted-foreground": { from: "#596b7d", to: "#5e6875" },
      "--card-foreground": { from: "#0a1724", to: "#171c24" },
      "--popover": { from: "#e5ebf1", to: "#ffffff" },
      "--popover-foreground": { from: "#0a1724", to: "#171c24" },
      "--secondary": { from: "#eff3f7", to: "#edf0f4" },
      "--secondary-foreground": { from: "#0a1724", to: "#171c24" },
      "--muted": { from: "#eff3f7", to: "#e6eaef" },
      "--primary": { from: "#0a1724", to: "#2861db" },
      "--primary-hover": { from: "#12283b", to: "#2154c4" },
      "--primary-active": { from: "#06121e", to: "#1b47a8" },
      "--accent": { from: "#e7eef9", to: "#eaf1fd" },
      "--accent-foreground": { from: "#315c9f", to: "#2258cc" },
      "--accent-hover": { from: "#244d83", to: "#1b47a8" },
      "--destructive": { from: "#b8323e", to: "#cc2f3c" },
      "--success": { from: "#1e7147", to: "#12774a" },
      "--warning": { from: "#80520a", to: "#8f5600" },
      "--border": { from: "#d7e0e9", to: "#e3e7ec" },
      "--input": { from: "#7b8ea1", to: "#808a97" },
      "--ring": { from: "#315c9f", to: "#2861db" },
      "--overlay": { from: "#07131f66", to: "#10141b80" },
      "--selection": { from: "#cfe0fa", to: "#d5e3fb" },
      "--selection-foreground": { from: "#0a1724", to: "#171c24" },
      "--code": { from: "#eff3f7", to: "#f3f5f8" },
      "--code-foreground": { from: "#0a1724", to: "#171c24" },
      "--code-border": { from: "#d7e0e9", to: "#e3e7ec" },
      "--sidebar-foreground": { from: "#394b5e", to: "#454f5c" },
      "--sidebar-primary": { from: "#0a1724", to: "#2861db" },
      "--sidebar-accent": { from: "#e7eef9", to: "#eaf1fd" },
      "--sidebar-accent-foreground": { from: "#315c9f", to: "#2258cc" },
      "--sidebar-border": { from: "#d7e0e9", to: "#e3e7ec" },
      "--sidebar-ring": { from: "#315c9f", to: "#2861db" },
    },
  },
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function difference(from: string[], to: string[]) {
  const before = new Set(from);
  const after = new Set(to);
  return {
    added: [...after].filter((value) => !before.has(value)).sort(),
    removed: [...before].filter((value) => !after.has(value)).sort(),
  };
}

function hasDifference(value: { added: string[]; removed: string[] }) {
  return value.added.length > 0 || value.removed.length > 0;
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function apiDelta(from: ApiSnapshot, to: ApiSnapshot) {
  const exports: Delta["exports"] = {};
  const variants: Delta["variants"] = {};
  const sizeUnions: Delta["sizeUnions"] = {};
  const modulePaths = new Set([...Object.keys(from.modules), ...Object.keys(to.modules)]);

  for (const modulePath of modulePaths) {
    const before = from.modules[modulePath] ?? { exports: [], variants: {}, sizeUnions: [] };
    const after = to.modules[modulePath] ?? { exports: [], variants: {}, sizeUnions: [] };
    const exportDifference = difference(before.exports, after.exports);
    if (hasDifference(exportDifference)) exports[modulePath] = exportDifference;

    const variantNames = new Set([...Object.keys(before.variants), ...Object.keys(after.variants)]);
    for (const name of variantNames) {
      const variantDifference = difference(before.variants[name] ?? [], after.variants[name] ?? []);
      if (hasDifference(variantDifference)) variants[`${modulePath}:${name}`] = variantDifference;
    }

    const sizeDifference = difference(before.sizeUnions, after.sizeUnions);
    if (hasDifference(sizeDifference)) sizeUnions[modulePath] = sizeDifference;
  }

  return { exports, variants, sizeUnions };
}

function tokenDelta(from: Record<string, string>, to: Record<string, string>) {
  const tokens: Delta["lightTokens"] = {};
  for (const name of new Set([...Object.keys(from), ...Object.keys(to)])) {
    if (from[name] !== to[name]) tokens[name] = { from: from[name], to: to[name] };
  }
  return tokens;
}

function getDelta(fromDir: string, toDir: string): Delta {
  const api = apiDelta(
    readJson<ApiSnapshot>(join(fromDir, "public-api.json")),
    readJson<ApiSnapshot>(join(toDir, "public-api.json")),
  );
  return {
    ...api,
    lightTokens: tokenDelta(
      readJson<Record<string, string>>(join(fromDir, "light-tokens.json")),
      readJson<Record<string, string>>(join(toDir, "light-tokens.json")),
    ),
  };
}

function sameDelta(actual: Delta, expected: Delta) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

async function selfTest() {
  const root = await mkdtemp(join(tmpdir(), "kood-api-delta-"));
  const from = join(root, "from");
  const matching = join(root, "matching");
  const changed = join(root, "changed");
  try {
    for (const directory of [from, matching, changed]) await mkdir(directory);
    const baseline: ApiSnapshot = {
      modules: {
        "src/index.ts": { exports: ["Button"], variants: {}, sizeUnions: [] },
        "src/components/ui/tabs.tsx": {
          exports: ["Tabs", "TabsContent", "TabsList", "TabsTrigger", "tabsListVariants"],
          variants: { variant: ["default", "line"] },
          sizeUnions: [],
        },
      },
    };
    const pillOnly: ApiSnapshot = {
      modules: {
        ...baseline.modules,
        "src/components/ui/tabs.tsx": {
          ...baseline.modules["src/components/ui/tabs.tsx"],
          variants: { variant: ["default", "line", "pill"] },
        },
      },
    };
    const extraExport: ApiSnapshot = {
      modules: {
        ...pillOnly.modules,
        "src/index.ts": { exports: ["Button", "Unexpected"], variants: {}, sizeUnions: [] },
      },
    };
    const light = { "--background": "#fff" };
    for (const [directory, api] of [
      [from, baseline],
      [matching, baseline],
      [changed, pillOnly],
    ] as const) {
      await writeFile(join(directory, "public-api.json"), `${JSON.stringify(api)}\n`);
      await writeFile(join(directory, "light-tokens.json"), `${JSON.stringify(light)}\n`);
    }
    const extra = join(root, "extra");
    await mkdir(extra);
    await writeFile(join(extra, "public-api.json"), `${JSON.stringify(extraExport)}\n`);
    await writeFile(join(extra, "light-tokens.json"), `${JSON.stringify(light)}\n`);

    assert(
      sameDelta(getDelta(from, matching), EXPECTED.A1),
      "A1 must accept an unchanged snapshot",
    );
    assert(
      sameDelta(getDelta(from, changed), EXPECTED.A2),
      "A2 must accept only the Tabs pill variant",
    );
    assert(
      sameDelta(getDelta(from, matching), EXPECTED.B3),
      "B3 must accept an unchanged snapshot",
    );
    assert(
      sameDelta(getDelta(from, matching), EXPECTED.B6),
      "B6 must accept an unchanged snapshot",
    );
    assert(
      !sameDelta(getDelta(from, extra), EXPECTED.A2),
      "A2 must reject any API change besides the Tabs pill variant",
    );
    console.log("assert-api-delta: self-test passed");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

function options() {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === "--self-test") return { selfTest: true as const };
  const values = new Map<string, string>();
  for (let index = 0; index < args.length; index += 2) {
    const flag = args[index];
    const value = args[index + 1];
    if (!flag || !value || !["--from", "--to", "--step"].includes(flag))
      throw new Error("usage: bun scripts/assert-api-delta.ts --from <dir> --to <dir> --step A1");
    values.set(flag, value);
  }
  const from = values.get("--from");
  const to = values.get("--to");
  const step = values.get("--step");
  if (values.size !== 3 || !from || !to || !step)
    throw new Error("usage: bun scripts/assert-api-delta.ts --from <dir> --to <dir> --step A1");
  return { selfTest: false as const, from: resolve(ROOT, from), to: resolve(ROOT, to), step };
}

const selected = options();
if (selected.selfTest) {
  await selfTest();
} else {
  const expected = EXPECTED[selected.step];
  if (!expected) throw new Error(`no expected API delta for step ${selected.step}`);
  const actual = getDelta(selected.from, selected.to);
  assert(
    sameDelta(actual, expected),
    `unexpected ${selected.step} API delta\nexpected: ${JSON.stringify(expected)}\nactual: ${JSON.stringify(actual)}`,
  );
  console.log(`assert-api-delta: ${selected.step} passed`);
}
