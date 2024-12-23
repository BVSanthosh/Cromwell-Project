module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['node_modules/(?!(axios)/)'], 
    setupFilesAfterEnv: ['./jest.setup.js'],
};