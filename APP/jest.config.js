const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'jest-preset-angular',
  collectCoverage: true,
  roots: ['<rootDir>/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  }),
  coverageReporters: ['text-summary', 'lcov', 'cobertura']
}