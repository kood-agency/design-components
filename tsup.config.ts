import { defineConfig } from "tsup";

// 빌더 선정: tsup(esbuild 코어 + d.ts는 rollup).
// 이 규모 라이브러리에는 단일 도구로 ESM+CJS+d.ts를 뽑는 tsup이 가장 짧다.
// rollup 단독은 플러그인 조합과 속도가 부담이고, swc는 번들러가 아니라 탈락.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  minify: false,
  external: ["react", "react-dom"],
});
