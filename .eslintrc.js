module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:compat/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['node_modules/**'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'compat', 'jsx-a11y', 'react', 'react-hooks'],
  rules: {
    // next rules
    '@next/next/no-html-link-for-pages': ['error', './app'],

    // base rules
    'no-await-in-loop': 'error',
    'no-console': [
      'off',
      { allow: ['warn', 'error', 'debug', 'group', 'groupEnd', 'groupCollapsed'] },
    ],
    'no-shadow': 'error',
    'no-use-before-define': ['error', 'nofunc'],
    'class-methods-use-this': 'error',
    'default-case': 'error',
    'no-eval': 'error',
    'no-magic-numbers': [
      'warn',
      { ignore: [-1, 0, 1, 2, 100, 1024, 60, 24, 365], ignoreArrayIndexes: true },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'no-duplicate-imports': 'error',
    'sort-imports': ['error', { ignoreCase: false, ignoreDeclarationSort: true }],
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',

    // import rules
    'import/first': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': 'error',

    // react rules
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    'react/forbid-prop-types': ['error', { forbid: ['any', 'array'] }],
    'react/no-unused-prop-types': 'warn',
    'react/no-unused-state': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': [
      'error',
      {
        order: ['static-methods', 'lifecycle', '/^(on|handle).+$/', 'everything-else', 'rendering'],
        groups: { rendering: ['/^render.+$/', 'render'] },
      },
    ],
    'react/sort-prop-types': [
      'error',
      { ignoreCase: true, callbacksLast: true, sortShapeProp: true },
    ],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],

    // react-hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      // parserOptions: {
      //   project: ['./apps/*/tsconfig.json'],
      // },
      rules: {
        // '@typescript-eslint rules
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',

        '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', ignoreRestSiblings: true },
        ],

        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, ignoreTypeReferences: true },
        ],

        '@typescript-eslint/no-non-null-assertion': 'off',
        // reference: https://github.com/typescript-eslint/typescript-eslint/issues/2245
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-floating-promises': [
          'error',
          { ignoreVoid: true, ignoreIIFE: false },
        ],

        // '@typescript-eslint rules
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
    polyfills: ['Promise'],
    react: {
      version: '18',
    },
  },
};
