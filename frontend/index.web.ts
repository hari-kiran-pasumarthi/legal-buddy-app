// webpack.config.js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Crucial alias for react-native to react-native-web
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
    // Specifically target the problematic 'Platform' utility
    // This tells Webpack to find Platform from react-native-web's exports
    // instead of the problematic internal react-native path.
    // The exact path might vary slightly with SDK versions, but this is a common one.
    'react-native/Libraries/Utilities/Platform': 'react-native-web/dist/exports/Platform',
    'react-native/Libraries/ReactNative/PaperUIManager': 'react-native-web/dist/exports/UIManager',
    'react-native/Libraries/ReactNative/BridgelessUIManager': 'react-native-web/dist/exports/UIManager',
  };

  // Ensure .web.js, .web.ts, etc., are prioritized for module resolution
  config.resolve.extensions = [
    '.web.js', '.js', '.json', '.web.jsx', '.jsx', '.web.ts', '.ts', '.web.tsx', '.tsx',
    ...config.resolve.extensions, // Keep existing Expo extensions
  ];

  // If you are encountering issues with specific modules *inside* node_modules
  // not being transpiled for web, you might need to add them to Babel's `include`.
  // This is generally handled by Expo, but if you're pulling in libraries
  // that aren't fully web-ready, this might be necessary.
  // Example (uncomment and adjust paths if necessary):
  /*
  const appDirectory = path.resolve(__dirname, '../../'); // Adjust if your root is different
  const projectIncludes = [
    path.resolve(appDirectory, 'node_modules/react-native/Libraries'),
    path.resolve(appDirectory, 'node_modules/react-native-web'),
    // Add other node_modules that throw similar errors here
  ];

  config.module.rules.forEach(rule => {
    if (rule.use && rule.use.loader && rule.use.loader.includes('babel-loader')) {
      if (Array.isArray(rule.include)) {
        rule.include = [...rule.include, ...projectIncludes];
      } else {
        rule.include = projectIncludes;
      }
    }
  });
  */

  return config;
};