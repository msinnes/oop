const config = require('@shared/jest-config');

module.exports = {
  ...config,
  collectCoverageFrom: [...config.collectCoverageFrom, 'src/*.ts'],
  testMatch: ['**/__tests__/**/*.spec.ts'],
};
