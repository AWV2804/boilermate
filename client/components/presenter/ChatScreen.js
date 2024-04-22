import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import { styles } from '../GlobalTypes.js';

/*
Paste this in for NavigationBar(look at other pages like ClassSelectScreen for example):
            <View style={{ ...styles.navigationBar, borderTopColor: 'gray', borderTopWidth: 0.4 }}>
                <TouchableOpacity style={styles.navButton} onPress={handleHomeNav}>
                    <HomeIcon name="home" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleClassSelectNav}>
                    <SettingsIcon name="school-outline" size={28} color="#C28E0C" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleClassSelectNav}>
                    <SettingsIcon name="chatbubble-ellipses-outline" size={28} color="#C28E0C" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleSettingsNav}>
                    <SettingsIcon name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
*/

const ChatScreen = () => {
    const navigate = useNavigation();

    const handleHomeNav = () => navigate.navigate('Home');
    const handleClassSelectNav = () => navigate.navigate('ClassSelect');
    const handleSettingsNav = () => navigate.navigate('Settings');
    const handleChatNav = () => navigate.navigate('Chat');
    return (
        <View style={styles.container}>
            {/* Navigation Bar */}
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
            {/* Rest of your screen content */}
        </View>
    );
};

export default ChatScreen;