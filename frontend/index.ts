/**
 * Entry point for the Expo application.
 * Registers the root component to ensure proper environment setup
 * for both Expo Go and native builds.
 */

import { registerRootComponent } from 'expo';
import App from './App';

// Register the main application component
registerRootComponent(App);
// This ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately.
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that the app is ready to run in both environments.
// This is essential for the Expo framework to correctly initialize the app
// and handle any platform-specific configurations or optimizations.
// The App component is the root of your application, and it will be rendered
