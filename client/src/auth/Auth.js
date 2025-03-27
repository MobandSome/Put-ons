import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
// import { supabase } from '../lib/subaseClient'
import { Button, Input } from '@rneui/themed'
import axios from 'axios';

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [refresh_token, setRefreshToken] = useState('')
  const [message, setMessage] = useState('')



  //This makes use of the supabase client to sign in with email and password(server version)
  async function handleLogin() { 
    try {

      setLoading(true)
      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password,
      });
      console.log("bumboclaat")
      console.log(response.data);

      setRefreshToken(response.data.refresh_token)

      if (error) Alert.alert(error.message)
        console.log('error')
        setLoading(false)

      // If login is successful, set the session
      setMessage(`Logged in successfully! Session: ${JSON.stringify(response.data.session)}`);
      setLoading(false);
    } catch  (error) {
      setMessage(`Login failed: ${error.response?.data?.error || error.message}`);
    }
  };

  async function handleLogout() {
    try{
      setLoading(true)
      const response = await axios.post('http://localhost:3000/logout', {
        refreshToken: refresh_token,
      });

      if (error) Alert.alert(error.message)
        console.log('error')
        setLoading(false)

      setMessage(`Logged out successfully!`);
    }
    catch (error) {
      setMessage(`Logout failed: ${error.response?.data?.error || error.message}`);
  }
}

  async function handleGoogleLogin() {
    setLoading(true)
    try{
      const response = await axios.post('http://localhost:3000/redirect/google')
      console.log(response.data)
      if (error) Alert.alert(error.message)
      setLoading(false)
    }
    catch (error) {
      setMessage(`Google login failed: ${error.response?.data?.error || error.message}`);
    }
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  async function googleLogin() {
    setLoading(true)
    const { user, session, error } = await axios.post('http://localhost:3000/redirect/google')
    
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => handleLogin()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
      <View>
        <Button title="Google Sign in" disabled={loading} onPress= {() => handleGoogleLogin()}></Button>
      </View>
      <View style = {styles.verticallySpaced}>
        <Button title="Sign out" onPress={() => handleLogout()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})