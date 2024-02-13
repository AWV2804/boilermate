import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Settings } from 'react-native'
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { styles } from './GlobalTypes';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleResetPassword = async () => {
        // Check valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;  
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent');
                navigation.navigate('Login');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{...styles.input, width: 300}}
            >
            </TextInput>
            <TouchableOpacity
                onPress={handleResetPassword}
                style={{...styles.button, marginTop: 20}}>
                <Text style={styles.buttonTextBlack}>Reset Password</Text>
            </TouchableOpacity> 
        </View>
    );
};

export default ForgotPasswordScreen;
