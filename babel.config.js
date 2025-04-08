module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
        },
      ],
      'nativewind/babel',
    ],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.png'],
          alias: {
            '@': './',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
