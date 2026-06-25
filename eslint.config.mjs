import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Static personal site: the cosmetic no-unescaped-entities rule is noise
  // (straight apostrophes/quotes render fine), so don't fail lint on it.
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated site and build artifacts for this repo:
    "dev/**",
    "docs/**",
  ]),
]);

export default eslintConfig;
