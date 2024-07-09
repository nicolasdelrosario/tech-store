module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: ["eslint:recommended", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  rules: {
    // Solo permite comillas simples y backticks para los strings
    quotes: ["error", "single", { allowTemplateLiterals: true }],
    // No permitir ; al final de cada línea
    semi: ["error", "never"],
  },
};
