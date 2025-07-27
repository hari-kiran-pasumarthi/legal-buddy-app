const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'react-native$': 'react-native-web',
    // Add this line to patch the missing Platform path
    'react-native/Libraries/Utilities/Platform': 'react-native-web/dist/exports/Platform',
  };

  config.resolve.extensions = [
    '.web.js', '.web.ts', '.web.tsx',
    '.js', '.ts', '.tsx', '.json', '.jsx',
    ...config.resolve.extensions,
  ];

  return config;
};
