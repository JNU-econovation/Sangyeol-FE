const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Workspace 설정
const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
  platforms: ['ios', 'android', 'native', 'web'],
  resolverMainFields: ['react-native', 'browser', 'main'],
  nodeModulesPaths: [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
  ],
};

// Workspace 폴더 감시 설정
config.watchFolders = [workspaceRoot];

module.exports = config;
