module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "tsconfig.json",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    // "prettier",
    // "prettier/@typescript-eslint",
  ],
  rules: {},
  // root: true,
  env: {
    node: true,
    jest: true,
  },
};
