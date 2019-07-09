module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/**/*.(test|spec).(ts|js)'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      enableTsDiagnostics: true,
    },
  },
}
