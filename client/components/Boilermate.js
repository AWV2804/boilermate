import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';

// import CreateRoomScreen from './CreateRoomScreen';
// import JoinRoomScreen from './JoinRoomScreen'
// import LobbyScreen from './LobbyScreen';
// import DistancePriceScreen from  './DistancePriceScreen';
// import VetoScreen from './VetoScreen';
// import SwipeScreen from './SwipeScreen';
// import QuestionsScreen from './QuestionsScreen';
// import FinalScreen from './FinalScreen';


const Boilermate = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default Boilermate;