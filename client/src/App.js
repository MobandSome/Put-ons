import React, { useState, useEffect } from 'react';
import { View , Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { supabase } from './lib/subaseClient'; // Import Supabase client
import Auth from './auth/Auth'; // Import your Auth componentr
import BottomTabsNavigator from './navigation/BottomTabsNavigator'; // Import your navigator

export default function App() {
  const [session, setSession] = useState(null);

  // useEffect(() => {
  //   // Fetch session on app start
  //   supabase.auth.getSession().then(({ data }) => {
  //     // console.log("ryeahhhhh")
  //     setSession(data?.session || null);
  //     // console.log(data)
  //     console.log(data.session.user.email)
  //   });

  //   // Listen for auth state changes
  //   const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   // Cleanup listener on unmount
  //   return () => {
  //     authListener.subscription.unsubscribe();
  //   };
  // }, []);

  return (
    // <View style={{ flex: 1, justifyContent: 'space-between' }}>
    //   <NavigationContainer>
    //     <BottomTabsNavigator />
    //   </NavigationContainer>
    // </View>
    <View>
      <Auth session = {session} setSession = {setSession}  />
      {session && session.user && <Text>{session.user.email}</Text>}
    </View>
  );
}

