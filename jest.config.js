module.exports = {
    preset: 'react-native',
    setupFiles: [
        './node_modules/react-native-gesture-handler/jestSetup.js'
    ],
    setupFilesAfterEnv: ['./jest/jest.setup.js'],
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|' +
        '@react-navigation|react-native-reanimated|' +
        'react-native-gesture-handler|react-native-safe-area-context|' +
        'react-native-vector-icons||@ui-kitten)|' +
        '@d11/react-native-fast-image/)'
    ],
    "collectCoverage": true,
    "coverageReporters": ["json", "html"],
};
