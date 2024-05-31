module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@services': './src/services',
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@dtos': './src/dtos',
            '@hooks': './src/hooks',
            '@validations': './src/validations',
            '@global': './src/global',
            '@storage': './src/storage',
          }
        }
      ],
      [
        'module:react-native-dotenv',
        {
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": true
        }
      ]
    ]
  };
};
