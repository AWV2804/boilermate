import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Settings } from 'react-native'
import { auth } from '../firebase';
import { sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { styles } from './GlobalTypes';
import { useNavigation } from '@react-navigation/native';

const ChangePasswordScreen = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const navigate = useNavigation();

    const handleChangePassword = () => {
        // Check password match
        if (password !== confirmpassword) {
            alert("Passwords do not match")
            return
        }
        const user = auth.currentUser;
        updatePassword(user, password)
            .then(() => {
                alert('Password updated');
                navigate.replace('Settings');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.inputBox}
                    secureTextEntry
                >
                </TextInput>
                <TextInput
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    style={styles.inputBox}
                    secureTextEntry
                >
                </TextInput>
                <TouchableOpacity
                    onPress={() => handleChangePassword()}
                    style= {{marginTop: 20}}>
                    <View style={styles.button}>
                        <Text style={styles.buttonTextBlack}>Change Password</Text>
                    </View>
                </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default ChangePasswordScreen;
