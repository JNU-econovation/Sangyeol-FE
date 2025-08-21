module.exports = {
  extends: ["expo", "prettier", "plugin:@typescript-eslint/recommended"],
  plugins: ["prettier", "@typescript-eslint"],
  node: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    moduleDirectory: ["node_modules", "src/"],
  },
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-require-imports": "off",
  },
};
