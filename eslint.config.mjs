import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "smst/**",
      "public/**",
      "tests/**",
      "next-env.d.ts",
      "*.bat",
      "*.xlsx",
      "*.pdf",
      "*.docx"
    ],
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@next/next/no-img-element": "off",
      "prefer-const": "warn",
    },
  }
);
