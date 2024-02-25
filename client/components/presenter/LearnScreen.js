import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../GlobalTypes.js';

const LearnScreen = () => {
    const navigate = useNavigation();
    const [videoUrl, setVideoUrl] = useState(null);

    const handleHomeNav = () => {
        navigate.navigate('Home');
    };

    const handleSettingsNav = () => {
        navigate.navigate('Settings');
    };

    const jsonData = {
        "title": "Huffman coding step-by-step example",
        "videoId": "iEm1NRyEe5c",
        "url": "https://www.youtube.com/watch?v=iEm1NRyEe5c"
    };
    useEffect(() => {
        // Set the video URL when the component mounts
        setVideoUrl(jsonData.url);
    }, []);

    return (
        <View style={styles.container}>
            <View style={{...styles.navigationBar, borderTopColor: 'gray', borderTopWidth: 0.4 }}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={handleHomeNav}>
                    <HomeIcon name="home" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <SettingsIcon name="school-outline" size={28} color="#C28E0C" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={handleSettingsNav}>
                    <SettingsIcon name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {videoUrl && (
                <Text style={{ marginTop: 20, fontSize: 16 }}>
                    Video URL: {videoUrl}
                </Text>
            )}
        </View>
    );
}

export default LearnScreen;