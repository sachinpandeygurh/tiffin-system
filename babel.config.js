module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel'],
    env: {
      production: {
        plugins: ['transform-remove-console']
      }
    }
  };
};
