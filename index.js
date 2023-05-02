/**
 * @format
 */

import {
    AppRegistry,
    LogBox,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { store } from './src/store';

LogBox.ignoreLogs(['Require cycle', 'Warning']);
LogBox.ignoreLogs([
    'Usage of "messaging().registerDeviceForRemoteMessages()" is not required.',
    'Warning',
]);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
LogBox.ignoreLogs(['"PermissionsAndroid" module works only for Android platform.']);

LogBox.ignoreLogs([
    '(ADVICE) View #4223 of type RCTView has a shadow set but cannot calculate shadow efficiently.',
]);
LogBox.ignoreLogs([
    `Usage of "messaging().registerDeviceForRemoteMessages()" is not required. You only need to register if auto-registration is disabled in your 'firebase.json' configuration file via the 'messaging_ios_auto_register_for_remote_messages' property.`,
    'Warning',
]);
LogBox.ignoreLogs(['Sending']);

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace('{' + k + '}', arguments[k]);
    }
    return a;
};

if (TouchableOpacity.defaultProps == null) TouchableOpacity.defaultProps = {};
TouchableOpacity.defaultProps.activeOpacity = 0.8;

if (__DEV__) {
    import('./ReactotronConfig').then(() => { });
}

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        return null;
    }
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () =>
    gestureHandlerRootHOC(HeadlessCheck),
);