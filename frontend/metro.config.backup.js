// metro.config.js
const { getDefaultConfig } = require('expo/metro-config-backup');
const path = require('path');

const config = getDefaultConfig(__dirname);

// ✅ Explicitly define web-specific aliases to avoid "unable to resolve" issues
config.resolver.extraNodeModules = {
  'react-native': path.resolve(__dirname, 'node_modules/react-native-web'),
  'react-native/Libraries/Utilities/Platform': path.resolve(__dirname, 'node_modules/react-native-web/dist/exports/Platform'),
  'react-native/Libraries/ReactNative/PaperUIManager': path.resolve(__dirname, 'node_modules/react-native-web/dist/exports/UIManager'),
  'react-native/Libraries/ReactNative/BridgelessUIManager': path.resolve(__dirname, 'node_modules/react-native-web/dist/exports/UIManager'),
  'react-native/Libraries/ReactPrivate/ReactNativePrivateInterface': path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/ReactNativePrivateInterface'),
};

// ✅ Add support for web extensions
if (Array.isArray(config.resolver.sourceExts)) {
  config.resolver.sourceExts.push('web.js', 'web.ts', 'web.tsx', 'web.jsx');
} else {
  config.resolver.sourceExts = ['js', 'json', 'ts', 'tsx', 'jsx', 'web.js', 'web.ts', 'web.tsx', 'web.jsx'];
}

// ✅ Clean resolver so there’s no custom `resolveRequest` issues
delete config.resolver.resolveRequest;

module.exports = config;
