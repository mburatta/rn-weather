module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./src/br/weather'],
                alias: {
                    '@br/weather': './src/br/weather',
                },
            },
        ],
    ],
};
