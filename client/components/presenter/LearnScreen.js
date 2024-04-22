import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, Linking } from 'react-native';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../GlobalTypes.js';
import userService from '../../user.service.js';

const LearnScreen = ({ route }) => {
    const [selectedTab, setSelectedTab] = useState('videos');
    const navigate = useNavigation();
    const { selectedClass, selectedTopics } = route.params;
    const [videos, setVideos] = useState([]);
    const [websites, setWebsites] = useState([]);

    useEffect(() => {
        console.log("Selected class:", selectedClass);
        console.log("Selected topic:", selectedTopics);
        // Assuming getTopicVideo is an imported or defined function that returns a promise
        userService.getTopicVideo('ECE', selectedClass, selectedTopics)
            .then(data => {
                setVideos(data.videos);
                setWebsites(data.websites);
            })
            .catch(error => {
                console.error('Error fetching videos', error);
            });
    }, [selectedClass, selectedTopics]);  // Ensure effects run when class or topic changes

    const handleHomeNav = () => navigate.navigate('Home');
    const handleClassSelectNav = () => navigate.navigate('ClassSelect');
    const handleSettingsNav = () => navigate.navigate('Settings');

    const renderItem = ({ item }) => {
        const url = selectedTab === 'videos' ? `https://www.youtube.com/watch?v=${item.videoId}` : item.url;
        const thumbnailUrl = selectedTab === 'videos' ? `https://img.youtube.com/vi/${item.videoId}/0.jpg` : item.thumbnailUrl;

        return (
            <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.itemContainer}>
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
            <View style={styles.tabSelector}>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'videos' ? styles.tabButtonActive : {}]}
                    onPress={() => setSelectedTab('videos')}>
                    <Text style={styles.tabText}>Videos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'websites' ? styles.tabButtonActive : {}]}
                    onPress={() => setSelectedTab('websites')}>
                    <Text style={styles.tabText}>Websites</Text>
                </TouchableOpacity>
            </View>
            
            {selectedTab === 'videos' && (
                <FlatList
                    data={videos}
                    renderItem={renderItem}
                    keyExtractor={item => item.videoId}
                    contentContainerStyle={{ padding: 20, alignItems: 'flex-start' }}
                />
            )}
            {selectedTab === 'websites' && (
                <FlatList
                    data={websites}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}  // Make sure websites have a unique 'id'
                    contentContainerStyle={{ padding: 0, alignItems: 'flex-start' }}
                />
            )}

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
        </View>
    );
};

export default LearnScreen;
