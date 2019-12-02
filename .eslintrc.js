module.exports = {
  env: {
    browser: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module"
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  rules: {
    "import/no-extraneous-dependencies": 0, // this says stencil/core should be a full dependency of puik
    "import/prefer-default-export": 0 // this is not how stenciljs works with exporting classes as a component
  }
}
