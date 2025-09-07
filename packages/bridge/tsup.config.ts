import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/native/index.ts"],
    outDir: "dist/native",
    splitting: false,
    sourcemap: true,
    clean: true,
    format: ["cjs", "esm"],
    dts: {
      compilerOptions: {
        incremental: false,
        composite: false,
      },
    },
    external: [
      "react",
      "react-dom",
      "next",
      "react/jsx-runtime",
      "react-native",
      "react-native-webview",
    ],
    banner: {
      js: '"use client";',
    },
  },
  {
    entry: ["src/web/index.ts"],
    outDir: "dist/web",
    splitting: false,
    sourcemap: true,
    clean: true,
    format: ["cjs", "esm"],
    dts: {
      compilerOptions: {
        incremental: false,
        composite: false,
      },
    },
    banner: {
      js: '"use client";',
    },
    external: [
      "react",
      "react-dom",
      "next",
      "react/jsx-runtime",
      "react-native",
      "react-native-webview",
    ],
  },
]);
