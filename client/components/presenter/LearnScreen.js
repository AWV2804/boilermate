import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, Linking } from 'react-native';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../GlobalTypes.js';
import userService from '../../user.service.js';

const LearnScreen = () => {
    const navigate = useNavigation();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Assuming getTopicVideo is an imported or defined function that returns a promise
        userService.getTopicVideo('ECE', 'ece 26400 - advanced C programming', 'Huffman Trees')
            .then(data => {
                setVideos(data.videos); // Set the video data to state
            })
            .catch(error => {
                console.error('Error fetching videos', error);
                // Handle error state as needed
            });
    }, []);

    const handleHomeNav = () => {
        navigate.navigate('Home');
    };

    const handleSettingsNav = () => {
        navigate.navigate('Settings');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline', marginVertical: 8 }}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={item => item.videoId}
                // Add some styling if needed
                contentContainerStyle={{ padding: 20 }}
            />
            <View style={{ ...styles.navigationBar, borderTopColor: 'gray', borderTopWidth: 0.4 }}>
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
        </View>
    );
};

export default LearnScreen;