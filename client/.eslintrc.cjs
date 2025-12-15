module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier', // Must be last to override other configs
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-refresh'],
  settings: {
    react: {
      version: '18.2',
    },
  },
  rules: {
    // React Refresh
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // React - General
    'react/react-in-jsx-scope': 'off', // Not needed with React 18 JSX transform
    'react/prop-types': 'off', // Using TypeScript for prop validation
    'react/display-name': 'warn',
    
    // React - Functional Components Only (No Class Components)
    'react/prefer-stateless-function': 'error',
    'react/no-unstable-nested-components': 'error',
    
    // React - JSX Best Practices
    'react/jsx-no-target-blank': 'error',
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'off', // Not needed with React 18
    'react/jsx-uses-vars': 'error',
    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/self-closing-comp': 'error',
    
    // React - Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // React - Performance & Best Practices
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'warn',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/void-dom-elements-no-children': 'error',
    'react/jsx-no-useless-fragment': 'warn',
    
    // React - Accessibility
    'react/button-has-type': 'error',
    'react/iframe-missing-sandbox': 'error',
  },
};
