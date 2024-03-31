module.exports = {
  collectCoverageFrom: [
    '@packages/**/*.js',
    '!**/node_modules/**',
  ],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  // coverageThreshold: {
  //   global: {  // global thresholds
  //     branches: 90,
  //     functions: 90,
  //     lines: 90,
  //     statements: 90
  //   },
  // },
  testMatch: ['**/__tests__/**/*.spec.js'],
};
