import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Home from '../HomeScreen.js'
import { useNavigation } from '@react-navigation/native';
import { styles } from '../GlobalTypes.js'
import { auth } from '../../firebase.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignupScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const navigation = useNavigation();
    
    const handleSignUp = () => {
        // Check valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;  
        }
        if (password !== confirmpassword) {
            alert("Passwords do not match")
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user.email)
            })
            .catch((error) => {
                var errorCode = alert(error.code);
                var errorMessage = alert(error.message);
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
                <TextInput
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    style={styles.input}
                    secureTextEntry
                >
                </TextInput>
                <TouchableOpacity
                    onPress={() => handleSignUp()}
                    style= {{marginTop: 20}}>
                    <View style={styles.button}>
                        <Text style={styles.buttonTextBlack}>Sign Up</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style= {{marginTop: 5}}>
                    
                    <Text style={styles.buttonTextBlue}>Have an account? Log in</Text>
              
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignupScreen