module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./src/br/weather'],
                alias: {
                    '@br/weather/core': './src/br/weather/core',
                    "@br/weather/assets": ["./src/br/weather/assets"],
                    '@br/weather/weather': './src/br/weather/modules/weather',
                    '@br/weather/settings': './src/br/weather/modules/settings',
                    '@br/weather/config': './src/br/weather/config'
                },
            }
        ],
        'react-native-reanimated/plugin'
    ],
};
