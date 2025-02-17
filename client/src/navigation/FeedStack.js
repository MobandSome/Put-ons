import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GenFeedScreen from '../screens/HomeScreens/GenFeed';
import PostDetail from '../screens/HomeScreens/PostDetail';

const Stack = createStackNavigator();

export default function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={GenFeedScreen} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
}