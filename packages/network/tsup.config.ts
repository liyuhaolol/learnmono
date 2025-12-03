import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,       // 自动生成 .d.ts
  clean: true,     // 清理 dist
  sourcemap: false,
  minify: false,
  external: ["axios"],//排除axios源码避免冲突
});