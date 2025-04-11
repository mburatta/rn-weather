module.exports = {
  root: true,
  extends: ['@react-native', 'airbnb', 'airbnb/hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'no-null'],
  rules: {
    'no-null/no-null': ['error'],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ], // force to define function return type
    'class-methods-use-this': [
      'error',
      { exceptMethods: ['componentDidCatch', 'componentDidAppear', 'componentDidDisappear'] },
    ],
    'import/no-unresolved': ['error', { ignore: ['^@br/weather(/.*)?$'] }], // ignore import with @app & .
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': [
          'test.{ts,tsx}', // repos with a single test file
          'test-*.{ts,tsx}', // repos with multiple top-level test files
          '**/*{.,_}{test,spec}.{ts,tsx}', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.ts', // jest config
          '**/jest.setup.ts' // jest setup
        ],
        'optionalDependencies': false
      }
    ],
    'max-len': ['error', 120], // change max length for a line to 120
    'no-console': 'error', // don't allow console
    'no-param-reassign':
        [
            'error',
            {
              props: true,
              ignorePropertyModificationsFor: ['draft', 'draftState']
            }
        ], // no params reassigned except using immer
    'no-unused-expressions':
        [
            'error',
            {
              allowShortCircuit: true
            }
        ], // don't use unused expressions except short circuit
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // don't use unused var except with _ prefix
    '@typescript-eslint/no-explicit-any': ['error'], // forbid to use 'any' type
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      // Test files only
      files: ['**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
