import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#fbf9f0', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', padding: 5, marginBottom: 10 }}>
        Welcome to Boilermate
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 1,
          marginHorizontal: 2,
          marginVertical: 4,
          padding: 10,
          borderRadius: 10,
          width: 300,
          height: 50,
          backgroundColor: '#C28E0C',
        }}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 16, marginTop: 5 }}>
            Get Started
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
