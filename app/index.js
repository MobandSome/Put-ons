// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);

// app/index.js
import { View, Text } from 'react-native';
import RootLayout from './_layout'; 

export default function Index() {
    return (
        <View>
            <RootLayout  /> 
            <Text>Welcome to PutOns!</Text>
        </View>
    );
}