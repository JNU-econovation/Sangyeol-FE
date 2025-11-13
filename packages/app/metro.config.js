const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Workspace 설정
const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

const pluginTestPath = path.resolve(
  __dirname,
  "../../../devtools/plugin-test/plugin-test",
);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
  platforms: ["ios", "android", "native", "web"],
  resolverMainFields: ["react-native", "browser", "main"],
  nodeModulesPaths: [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
  ],
  unstable_enableSymlinks: true,
  extraNodeModules: {
    "plugin-test": pluginTestPath,
    // React와 React Native를 워크스페이스의 단일 인스턴스로 강제
    react: path.resolve(workspaceRoot, "node_modules/react"),
    "react-native": path.resolve(workspaceRoot, "node_modules/react-native"),
  },
  // 🔥 핵심: React 중복 방지를 위한 커스텀 resolver
  resolveRequest: (context, moduleName, platform) => {
    // React 모듈을 항상 워크스페이스의 인스턴스로 리다이렉트
    if (moduleName === "react" || moduleName === "react-native") {
      return {
        filePath: path.resolve(
          workspaceRoot,
          "node_modules",
          moduleName,
          "index.js",
        ),
        type: "sourceFile",
      };
    }

    // 기본 resolution
    return context.resolveRequest(context, moduleName, platform);
  },
};

config.watchFolders = [workspaceRoot, pluginTestPath];

module.exports = config;
