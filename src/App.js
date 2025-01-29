import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabsNavigator from './navigation/BottomTabsNavigator';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      <NavigationContainer>
        <BottomTabsNavigator/>
      </NavigationContainer>
    </View>
    
    // <View style={styles.container}>
      
    // </View>
  );
}

