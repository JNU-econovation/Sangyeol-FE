/** @type {import('docflow').Config} */
export default {
  project: {
    root: process.cwd(),
    packageManager: "yarn",
    workspace: {
      include: ["packages/api"],
      exclude: [],
    },
  },
  commands: {
    build: {
      outputDir: "docs/references",
      manifest: {
        enabled: true,
        prefix: "/api",
      },
      generator: {
        name: "vitepress",
        signatureLanguage: "typescript",
      },
    },
    check: {
      entryPoints: ["src/**/*.ts"],
    },
  },
};
