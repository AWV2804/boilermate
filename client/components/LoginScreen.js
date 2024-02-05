import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Home from './HomeScreen.js'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placerholder="Email"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                >
                </TextInput>
                <TextInput
                    placerholder="Password"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    secureTextEntry
                >
                </TextInput>
                <TouchableOpacity
                    onPress={() => useNavigation.navigate('Login')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </View>
                    
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        // backgroundColor: 'white'
        },
        inputContainer: {   
            width: 300
        },
        input: {
            backgroundColor: '#ddd',
            borderRadius: 10, // Add this line to make the input boxes rounded
            //backgroundColor: '#f5f5f5',
            padding: 10,
            marginVertical: 5,
            height: 50,
            borderRadius: 10 // Add this line to make the input boxes rounded
        },
        button: {
            marginHorizontal: 2,
            marginVertical: 4,
            padding: 10,
            borderRadius: 10,
            width: 300,
            height: 50,
            backgroundColor: '#C28E0C',
        },
        buttonText: {
            
            color: 'black',
            //backgroundColor: '#C28E0C',
            textAlign: 'center',
            marginTop: 5,
            fontSize: 16,
        }
})
