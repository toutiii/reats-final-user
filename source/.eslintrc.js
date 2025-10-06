module.exports = {
    env: {
      es2021: true,
      node: true,
      browser: true,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
    ignorePatterns: ["node_modules/", "**/node_modules/**", "dist/", "build/", "*.d.ts", "**/components/ui/**"],
    overrides: [
      {
        env: {
          node: true,
        },
        // files: [
        //   ".eslintrc.{js,cjs}"
        // ],
        parserOptions: {
          sourceType: "script",
        },
        files: ["*.ts", "*.tsx"],
        parser: "@typescript-eslint/parser",
        plugins: ["@typescript-eslint"],
      },
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["react"],
    rules: {
      indent: "off",
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off", // Désactive la règle qui exige React en scope pour JSX
      "no-trailing-spaces": 1,
      "no-multi-spaces": 1,
      "no-unexpected-multiline": 0,
      "no-multiple-empty-lines": [2, { max: 2, maxEOF: 0 }],
      "no-whitespace-before-property": 1,
      "no-mixed-spaces-and-tabs": 1,
      "space-in-parens": 1,
      "no-extra-semi": 1,
      "no-tabs": 1,
      "no-confusing-arrow": 1,
      "multiline-ternary": 1,
      "max-len": "off",
      "keyword-spacing": 1,
      "new-parens": 1,
      "lines-between-class-members": 1,
      "array-bracket-spacing": 1,
      "react-hooks/exhaustive-deps": 0,
      "react/no-unescaped-entities": "off",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  };