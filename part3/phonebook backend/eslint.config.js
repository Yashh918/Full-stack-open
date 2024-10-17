import globals from "globals"
import js from '@eslint/js'


export default [
  js.configs.recommended,
  { 
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node
      },
      ecmaVersion: "latest",
    },
  },
];