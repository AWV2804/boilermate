import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Settings } from 'react-native'
import React, { useEffect, useState } from 'react'
import Home from './HomeScreen.js'
import { useNavigation } from '@react-navigation/native';
import { styles } from './GlobalTypes.js'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    useEffect(() => {
        const loggedin = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace('Settings')
          }
        })
    
        return loggedin
      }, [])

    // Handle Log In
    const handleLogIn = () => {
        // Check valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;  
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Logged in with: ', user.email)
            })
            .catch((error) => {
                //var errorCode = alert(error.code);
                var errorMessage = alert("Invalid credentials. Please try again.");
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
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                >
                </TextInput>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                >
                </TextInput>
                <TouchableOpacity
                    onPress={handleLogIn}
                    style= {{marginTop: 20}}>
                    <View style={styles.button}>
                        <Text style={styles.buttonTextBlack}>Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style= {{marginTop: 5}}>
                    
                    <Text style={styles.buttonTextBlue}>Don't have an account? Sign up</Text>
              
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen