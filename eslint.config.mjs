import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-plugin-prettier/recommended";

const eslintConfig = defineConfig([
    ...nextVitals,
    prettierConfig,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        "prisma/generated/**",
    ]),
]);

export default eslintConfig;
