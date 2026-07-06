module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    // No explicit reanimated/worklets plugin: babel-preset-expo auto-injects
    // react-native-worklets/plugin for Reanimated 4 on Expo SDK 57.
  };
};
