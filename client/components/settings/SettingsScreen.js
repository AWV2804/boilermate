import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase.js'
import { styles } from '../GlobalTypes.js'

const SettingsScreen = () => {
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigation();

    useEffect(() => {
        // Fetch the current user's email from Firebase Auth
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUserEmail(currentUser.email);
        }
    }, []);

    const handlePasswordChange = () => {  
        navigate.navigate('ChangePassword');
    }
    const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigate.replace('Login')
      })
      .catch(error => alert(error.message))
  }

    return (
        <View style={{...styles.container, justifyContent: 'flex-start'}}>
            <Text style={{...styles.buttonTextBlack, marginTop: 30}}>User Email: {userEmail}</Text>
            <TouchableOpacity
                onPress={handlePasswordChange}
                style= {{marginTop: 20}}>
                <View style={{...styles.button, backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1}}>
                    <Text style={{...styles.buttonTextBlack, fontWeight: 'bold'}}>Change Password</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignOut}
                style= {{marginTop: 10}}>
                <View style={{...styles.button, backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1}}>
                    <Text style={{...styles.buttonTextRed, fontWeight: 'bold'}}>Sign Out</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;
