module.exports = {
  collectCoverageFrom: [
    '/src/',
    '!**/__tests__/**',
  ],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {  // global thresholds
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    },
  },
  testMatch: ['**/__tests__/**/*.spec.js'],
};