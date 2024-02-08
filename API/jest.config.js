/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'node',
  verbose: true,
  coverageReporters: ['text-summary', 'lcov', 'cobertura'],
 
};

process.env = Object.assign(process.env, {
  JWT_KEY: 'fake-secret'
})