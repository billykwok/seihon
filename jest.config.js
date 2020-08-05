module.exports = {
  projects: ['<rootDir>/packages/*/jest.config.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/src/index.ts',
    '!**/src/macro.ts',
    '!**/src/types.ts',
    '!**/*.d.ts',
  ],
  notify: true,
  notifyMode: 'always',
  coverageProvider: 'v8',
  verbose: true,
};
