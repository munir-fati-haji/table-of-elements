const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const angularTemplate = require('@angular-eslint/eslint-plugin-template')

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],

      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      semi: ["error", "always"],
      quotes: ["error", "single"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],

      "no-console": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "object-curly-spacing": ["error", "always"],
      "arrow-parens": ["error", "always"],
      "no-trailing-spaces": "error",
      "max-len": ["error", { code: 120 }],
      "prefer-const": "error",
      "no-var": "error",
      "newline-before-return": "error",

      "no-duplicate-imports": "error",
      "prefer-arrow-callback": "error",
      "no-implicit-coercion": ["error", { allow: ["!!"] }],
      "no-return-await": "error",
      "no-shadow": "error",
      "no-useless-return": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/eqeqeq": "error",
      "@angular-eslint/template/banana-in-box": "error",
    },
  }
);
