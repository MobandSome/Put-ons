import * as React from 'react';
import { View, Text, Button } from 'react-native';


function GenFeedScreen ({navigation}) {
  return (
    // <View>
    //   <Text style={{ color: 'black' }}>Welcome to the Home Screen</Text>
    //   <Text style={{ color: 'black' }}>This is the main page of the application.</Text>
    // </View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button
        title="Go to Post Detail"
        onPress={() => navigation.navigate('PostDetail')}
      />
    </View>
  );
};

export default GenFeedScreen;