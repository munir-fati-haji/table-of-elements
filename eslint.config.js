const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const tsParser = require("@typescript-eslint/parser");
const angular = require("angular-eslint");
const sonarjs = require("eslint-plugin-sonarjs");
const importPlugin = require("eslint-plugin-import");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    plugins: {
      import: importPlugin,
      sonarjs: sonarjs,
    },
    languageOptions: {
      parser: tsParser, // Use the actual imported parser
      parserOptions: {
        project: "./tsconfig.json",
        createDefaultProgram: true,
      },
    },
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
      "no-magic-numbers": [
        "warn",
        {
          detectObjects: false,
          enforceConst: true,
          ignore: [-1, 0, 1, 2, 10, 100],
          ignoreArrayIndexes: true,
        },
      ],
      "max-lines-per-function": [
        "warn",
        {
          max: 20,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      indent: ["error", 2],
      "max-lines": ["error", { max: 300 }],
      "@typescript-eslint/explicit-member-accessibility": "warn",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
        },
      ],
      "@typescript-eslint/parameter-properties": [
        "warn",
        {
          allow: ["public", "private", "protected"],
        },
      ],
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@angular-eslint/use-lifecycle-interface": "error",
      "@angular-eslint/relative-url-prefix": "error",
      "arrow-body-style": "error",
      curly: "error",
      "no-bitwise": "error",
      "no-caller": "error",
      eqeqeq: [
        "error",
        "always",
        {
          null: "ignore",
        },
      ],
      "guard-for-in": "error",
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "no-eval": "error",
      "no-labels": "error",
      "no-new": "error",
      "no-new-wrappers": "error",
      "object-shorthand": [
        "error",
        "always",
        {
          avoidExplicitReturnArrows: true,
        },
      ],
      radix: "error",
      "spaced-comment": ["error", "always"],
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowAny: true,
        },
      ],
      "import/no-duplicates": [
        "error",
        {
          "prefer-inline": true,
        },
      ],
      "no-self-compare": "error",
      "no-unreachable-loop": "error",
      "no-unused-private-class-members": "error",
      "block-scoped-var": "error",
      "sonarjs/cognitive-complexity": [1, 7],
      "sonarjs/no-ignored-return": 1,
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-unsafe-function-type": "error",
      "@typescript-eslint/no-wrapper-object-types": "error",
      "@typescript-eslint/member-ordering": [
        "warn",
        {
          default: [
            "public-static-field",
            "protected-static-field",
            "private-static-field",
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "constructor",
            "public-static-method",
            "protected-static-method",
            "private-static-method",
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",
          ],
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
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
  },
);
