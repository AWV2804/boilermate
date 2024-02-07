import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Home from './HomeScreen.js'
import { useNavigation } from '@react-navigation/native';
import { styles } from './GlobalTypes.js'
import { auth } from '../firebase.js'

const SignupScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user.email)
                // ...
            })
            .catch((error) => {
                var errorCode = alert(error.code);
                var errorMessage = alert(error.message);
                // ..
            });
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placerholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                >
                </TextInput>
                <TextInput
                    placerholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                >
                </TextInput>
                <TouchableOpacity
                    onPress={() => handleSignUp()}
                    style= {{marginTop: 20}}>
                    <View style={styles.button}>
                        <Text style={styles.buttonTextBlack}>Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style= {{marginTop: 5}}>
                    
                    <Text style={styles.buttonTextBlue}>Don't have an account? Sign up</Text>
              
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignupScreen