module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'dotenv-import',
                {
                    moduleName: '@env',
                    path: '.env',
                    blacklist: null,
                    whitelist: null,
                    safe: true,
                    allowUndefined: false,
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
