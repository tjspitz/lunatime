const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  // will say 'expect' is undefined...
  // setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true,
};

module.exports = createJestConfig(customJestConfig);
