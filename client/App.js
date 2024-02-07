// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { TailwindProvider } from 'tailwindcss-react-native';
// import { StyleSheet } from 'react-native';
// import { View } from 'react-native';
// import { StatusBar } from 'react-native';
// import { Text } from 'react-native';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            <Stack.Screen options={{ headerTitle: 'Boilermate Login', headerBackVisible: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerTitle: 'Boilermate Signup', headerBackVisible: false }} name="Signup" component={SignupScreen} />
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
