import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase.js'
import { styles } from '../GlobalTypes.js'
import HomeIcon from 'react-native-vector-icons/AntDesign';
import SettingsIcon from 'react-native-vector-icons/Ionicons';

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
    const handleHomeNav = () => {
        navigate.navigate('Home');
    };

    const handleSettingsNav = () => {
        navigate.navigate('Settings');
    };

    const handleClassSelectNav = () => {
        navigate.navigate('ClassSelect');
    };

    const handleChatNav = () => {
        navigate.navigate('Chat');
    };

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
            <View style={{ ...styles.navigationBar, borderTopColor: 'gray', borderTopWidth: 0.4 }}>
                <TouchableOpacity style={styles.navButton} onPress={handleHomeNav}>
                    <HomeIcon name="home" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleClassSelectNav}>
                    <SettingsIcon name="school-outline" size={28} color="#C28E0C" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleChatNav}>
                    <SettingsIcon name="chatbubble-ellipses-outline" size={28} color="#C28E0C" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleSettingsNav}>
                    <SettingsIcon name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SettingsScreen;
