import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('rnEject4', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('rnEject4', { rootTag });
}
