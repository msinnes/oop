const config = require('@shared/jest-config');

module.exports = {
  ...config,
  testMatch: ['**/__tests__/**/*.spec.ts'],
};
