// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TailwindProvider } from 'tailwindcss-react-native';


// import { StyleSheet } from 'react-native';
// import { View } from 'react-native';
// import { StatusBar } from 'react-native';
// import { Text } from 'react-native';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/auth/LoginScreen';
import SignupScreen from './components/auth/SignupScreen';
import SettingsScreen from './components/settings/SettingsScreen';
import ForgotPasswordScreen from './components/auth/ForgotPasswordScreen';
import ChangePasswordScreen from './components/settings/ChangePasswordScreen';
import ClassSelectScreen from './components/presenter/ClassSelectScreen';
import LearnScreen from './components/presenter/LearnScreen';
import ChatScreen from './components/presenter/ChatScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{ headerTitle: 'Boilermate Home', headerBackVisible: false, headerShown: false}} name="Home" component={HomeScreen} />
            <Stack.Screen options={{ headerTitle: 'Boilermate Login', headerBackVisible: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerTitle: 'Boilermate Signup', headerBackVisible: false }} name="Signup" component={SignupScreen} />
            <Stack.Screen options={{ headerTitle: 'Settings', headerBackVisible: false }} name="Settings" component={SettingsScreen} />
            <Stack.Screen options={{ headerTitle: 'Forgot Password', headerBackVisible: true }} name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen options={{ headerTitle: 'Change Password', headerBackVisible: true }} name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen options={{ headerTitle: 'Class Select', headerBackVisible: false }} name="ClassSelect" component={ClassSelectScreen} />
            <Stack.Screen options={{ headerTitle: 'Learn', headerBackVisible: false }} name="Learn" component={LearnScreen} />
            <Stack.Screen options={{ headerTitle: 'Chat', headerBackVisible: false }} name="Chat" component={ChatScreen} />
       </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hi this is Andrew and he's losing his mind!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
