module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'off',
    'eqeqeq': ['error', 'always'],
    'no-var': 'error',
    'prefer-const': 'error',
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    '.eslintrc.cjs',
    'client',
    'server',
    'shared',
  ],
  overrides: [
    {
      files: ['client/**/*'],
      extends: ['./client/.eslintrc.cjs'],
    },
    {
      files: ['server/**/*'],
      extends: ['./server/.eslintrc.cjs'],
    },
  ],
};
