import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = ({ navigation }) => {

  return (
    <View className="grow" style={{paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: '#fbf9f0'}}>
        <View className="flex h-1/2 justify-center items-center">
          <Image
            resizeMode='contain'
            style={{width: 300, height: 100}}
            source={require('../assets/icon.png')}
          />
        </View>
        <View className="flex grow pl-8 pr-8">
          <TouchableOpacity>
            <View className="shadow-md mx-2 my-4 p-4 rounded-2xl" style={{backgroundColor: '#f1dd76'}}>
              <Text className="text-center" variant="titleMedium">Create Room</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View className="shadow-md mx-2 my-4 p-4 rounded-2xl" style={{backgroundColor: '#f1dd76'}}>
              <Text className="text-center" variant="titleMedium">Join Room</Text>
            </View>
          </TouchableOpacity >
        </View>
        {/* <Button icon="camera" mode="contained" onPress={() => navigation.navigate("Final")}>
    Press me
  </Button> */}
    </View>
  )
}

export default HomeScreen;