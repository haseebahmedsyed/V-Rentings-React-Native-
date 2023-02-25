/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AlertNotificationRoot } from 'react-native-alert-notification';
const RNRedux = () => (
  <Provider store={store}>
    <AlertNotificationRoot>
      <App />
    </AlertNotificationRoot>
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
