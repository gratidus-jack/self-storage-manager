module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier', // Must be last to override other configs
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript-specific rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    
    // Node.js-specific rules
    'no-console': 'off', // Allow console in server code for logging
    'no-process-exit': 'warn', // Warn about process.exit() but allow for graceful shutdown
    'no-path-concat': 'error', // Use path.join() instead of string concatenation
    'handle-callback-err': 'error', // Enforce error handling in callbacks
    'no-sync': 'warn', // Discourage synchronous methods
    
    // Error handling
    'no-throw-literal': 'error', // Throw Error objects, not literals
    'prefer-promise-reject-errors': 'error', // Reject with Error objects
    
    // Best practices
    'eqeqeq': ['error', 'always'], // Require === and !==
    'no-var': 'error', // Use let/const instead of var
    'prefer-const': 'error', // Prefer const for variables that are never reassigned
    'prefer-arrow-callback': 'error', // Prefer arrow functions for callbacks
    'no-return-await': 'off', // Disabled in favor of @typescript-eslint version
    '@typescript-eslint/return-await': ['error', 'in-try-catch'], // Return await only in try-catch
    
    // Code quality
    'no-duplicate-imports': 'error', // Prevent duplicate imports
    'no-useless-return': 'error', // Disallow redundant return statements
    'no-useless-catch': 'error', // Disallow unnecessary catch clauses
    'require-atomic-updates': 'error', // Prevent race conditions with await
    
    // Security
    'no-eval': 'error', // Disallow eval()
    'no-implied-eval': 'error', // Disallow implied eval()
    'no-new-func': 'error', // Disallow new Function()
  },
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs', 'vitest.config.ts', 'tests'],
};
