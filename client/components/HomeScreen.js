import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import UserService from '../user.service'

import { styles } from './GlobalTypes';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', padding: 5, marginBottom: 10 }}>
        Welcome to Boilermate
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} testID="PLEASEWORK">
        <View style={styles.button}>
          <Text style={styles.buttonTextBlack}>
            Get Started
          </Text>
        </View>
      </TouchableOpacity>
      <Button icon="camera" mode="contained" onPress={() => UserService.getTopicVideo()}>
        VideoAPI Test
      </Button>

    </View>
  );
};

export default HomeScreen;

