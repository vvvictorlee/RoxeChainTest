module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
 // setupTestFrameworkScriptFile has been deprecated in
  // favor of setupFilesAfterEnv in jest 24
  setupFilesAfterEnv: ['./jest.setup.js']
};