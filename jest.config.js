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
    collectCoverageFrom: [
        'src/**/*.ts',
        'src/**/*.tsx',
        '!src/**/*.d.ts',
        '!src/**/index.ts',
        '!src/**/index.tsx',
        '!src/**/*.styles.ts',
        '!src/**/*.stories.tsx',
        '!src/**/*.spec.ts',
        '!src/**/*.spec.tsx',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/android/',
        '/ios/',
        '/jest/',
        '/.storybook/',
    ],

};
