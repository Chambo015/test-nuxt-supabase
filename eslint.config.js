import antfu from "@antfu/eslint-config";
import stylistic from "@stylistic/eslint-plugin";
import tailwindcss from "eslint-plugin-tailwindcss";
import nuxt from "./.nuxt/eslint.config.mjs";

const ignores = [
  ".nuxt",
  "**/.nuxt/**",
  ".output",
  "**/.output/**",
  "node_modules",
  "**/node_modules/**",
  "public",
  "**/public/**",
];

export default nuxt(
  antfu(
    {
      formatters: true,
      plugins: {
        "@stylistic": stylistic,
      },
      rules: {
        "style/quotes": ["warn", "double"],
        "style/semi": ["warn", "always"],
        "style/quote-props": ["warn", "as-needed"],
        "style/brace-style": ["error", "1tbs"],
        curly: "off",
        "antfu/if-newline": ["off"],
      },
      vue: {
        overrides: {
        // Priority B: Strongly Recommended (Improving Readability)
          "vue/max-attributes-per-line": ["error", { singleline: 4 }],

          // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
          "vue/attributes-order": ["error", { alphabetical: true }],
          "vue/component-name-in-template-casing": [
            "error",
            "PascalCase",
            {
              registeredComponentsOnly: false,
            // ignores: ['i18n-t'],
            },
          ],
          // Uncategorized
          "vue/next-tick-style": ["error", "promise"],
          "vue/no-duplicate-attr-inheritance": "error",
          "vue/block-order": [
            "error",
            {
              order: [["script", "template"], "style"],
            },
          ],
          "vue/html-self-closing": [
            "error",
            {
              html: { normal: "never", void: "always" },
            },
          ],
        },
      },
      typescript: {
        overrides: {
          "@typescript-eslint/semi": ["warn", "always"],
          "@typescript-eslint/brace-style": ["error", "1tbs", { allowSingleLine: true }],
          "@typescript-eslint/ban-ts-comment": "off",
        },
      },
      js: {
        overrides: {
          "no-console": "off",
          semi: ["error", "always"],
          // 'curly': ['error', 'all'],
          "eslint-comments/no-unlimited-disable": "off",
        },
      },
      ignores,
    },
    tailwindcss.configs["flat/recommended"],
    { rules: { "tailwindcss/no-custom-classname": "off" },
    },
  ),
);
