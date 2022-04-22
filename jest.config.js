/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default  {
  preset: 'ts-jest/presets/js-with-ts-esm',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  testEnvironment: 'node',
  reporters: [ "default", "jest-junit" ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  }
};