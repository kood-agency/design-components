import { defineConfig } from "tsup";

// tsup bundles ESM/CJS; tsconfig.build.json emits declarations with TypeScript 7.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: false,
  clean: true,
  sourcemap: true,
  treeshake: true,
  minify: false,
  external: ["react", "react-dom"],
});
