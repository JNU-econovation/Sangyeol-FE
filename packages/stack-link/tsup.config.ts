import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["cjs", "esm"],
  dts: false,
  banner: {
    js: '"use client";',
  },
  external: ["react", "react-dom", "next", "react/jsx-runtime"],
});
