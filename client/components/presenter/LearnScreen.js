import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, Linking } from 'react-native';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../GlobalTypes.js';
import userService from '../../user.service.js';

const LearnScreen = ({ route }) => {
    const navigate = useNavigation();
    const { selectedClass, selectedTopics } = route.params;
    const [videos, setVideos] = useState([]);
    const [websites, setWebsites] = useState([]);

    useEffect(() => {
        console.log("Selected class:", selectedClass);
    }, [selectedClass]);

    useEffect(() => {
        console.log("Selected topic:", selectedTopics);
    }, [selectedTopics]);
    useEffect(() => {
        // Assuming getTopicVideo is an imported or defined function that returns a promise
        //CURRENTLY HARDCODED
        console.log()
        userService.getTopicVideo('ECE', selectedClass, selectedTopics)
            .then(data => {
                setVideos(data.videos);
                setWebsites(data.websites);
            })
            .catch(error => {
                console.error('Error fetching videos', error);
            });
    }, []);

    const handleHomeNav = () => {
        navigate.navigate('Home');
    };
    const handleClassSelectNav = () => {
        navigate.navigate('ClassSelect')
    };
    const handleSettingsNav = () => {
        navigate.navigate('Settings');
    };

    const renderItem = ({ item }) => {
        // Construct thumbnail URL from video ID (assuming item.videoId holds the YouTube video ID)
        const thumbnailUrl = `https://img.youtube.com/vi/${item.videoId}/0.jpg`;
    
        return (
            <TouchableOpacity onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${item.videoId}`)} style={styles.itemContainer}>
                <Image
                    source={{ uri: thumbnailUrl }}
                    style={styles.thumbnail}
                />
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        );
    };
    

    return (
        <View style={styles.container}>
            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={item => item.videoId}
                contentContainerStyle={{ padding: 20, alignItems: 'flex-start' }} // Adjust padding as needed
            />
            <FlatList
                data={websites}
                renderItem={renderItem}
                keyExtractor={item => item.videoId}
                contentContainerStyle={{ padding: 20, alignItems: 'flex-start' }} // Adjust padding as needed
            />
            <View style={{ ...styles.navigationBar, borderTopColor: 'gray', borderTopWidth: 0.4 }}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={handleHomeNav}>
                    <HomeIcon name="home" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={handleClassSelectNav}>
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