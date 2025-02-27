module.exports = {
  collectCoverageFrom: [
    '!**/__tests__/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!*.config.js',
    '!**/.eslintrc.js',
    '!src/index.js',
    '!src/index.ts',
    '!index.d.ts',
  ],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {  // global thresholds
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    },
  },
  testMatch: ['**/__tests__/**/*.spec.js'],
};