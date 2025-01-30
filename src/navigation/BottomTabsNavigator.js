import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import GenFeedScreen from '../screens/HomeScreens/GenFeed';
import FeedStack from './FeedStack';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileStack from '../screens/UserProfileScr/ProfileScreen';

const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={FeedStack} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;