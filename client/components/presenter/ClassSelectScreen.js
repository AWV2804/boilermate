import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../GlobalTypes.js';
import DropDownPicker from 'react-native-dropdown-picker';
import userService from '../../user.service.js';
import classTopics from '../../class_topics.json'

const ClassSelectScreen = () => {
    const navigate = useNavigation();

    const [openClass, setOpenClass] = useState(false);
    const [valueClass, setValueClass] = useState(null);
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);

    const [openTopic, setOpenTopic] = useState(false);
    const [valueTopic, setValueTopic] = useState(null);
    const [topics, setTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);

    const [streaks, setStreaks] = useState(0);
    const [credits, setCredits] = useState(0);

    useEffect(() => {
        const classItems = Object.keys(classTopics).map(key => ({
            label: key,
            value: key
        }));
        setClasses(classItems);
        setFilteredClasses(classItems);
    }, []);

    useEffect(() => {
        if (valueClass) {
            const selectedTopics = classTopics[valueClass].map(t => ({ label: t, value: t }));
            setTopics(selectedTopics);
            setFilteredTopics(selectedTopics);
        }
    }, [valueClass]);

    useEffect(() => {
        userService.getUser('andrewtu517@gmail.com')
        .then(data => {
            setStreaks(data.streaks);
            setCredits(data.credits);
        })
        .catch(error => {
            console.error('Error fetching user data', error);
        });
    }, []);

    // Log changes to valueClass
    // useEffect(() => {
    //     console.log("Selected class:", valueClass);
    // }, [valueClass]);

    // // Log changes to valueTopic
    // useEffect(() => {
    //     console.log("Selected topic:", valueTopic);
    // }, [valueTopic]);

    const handleHomeNav = () => {
        navigate.navigate('Home');
    };

    const handleSettingsNav = () => {
        navigate.navigate('Settings');
    };

    const handleClassSelectNav = () => {
        navigate.navigate('ClassSelect');
    };

    const handleClassSearch = (text) => {
        if (text) {
            const filtered = classes.filter(item =>
                item.label.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredClasses(filtered);
        } else {
            setFilteredClasses(classes);
        }
    };

    const handleTopicSearch = (text) => {
        if (text) {
            const filtered = topics.filter(topic =>
                topic.label.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredTopics(filtered);
        } else {
            setFilteredTopics(topics);
        }
    };

    const navigateToLearnScreen = () => {
        navigate.navigate('Learn', {
            selectedClass: valueClass,
            selectedTopics: valueTopic
        });
    };

    return (
        <View style={styles.container}>
            <View style={{
                position: 'absolute', 
                top: 10, 
                right: 10, 
                alignItems: 'flex-end'
            }}>
                <Text style={{ fontSize: 16, color: '#000', marginBottom: 4 }}>
                    Streak: {streaks}
                </Text>
                <Text style={{ fontSize: 16, color: '#000' }}>
                    Credits: {credits}
                </Text>
            </View>
            <View style={{...styles.dropdown, zIndex: 2}}>
                <Text style={{marginRight: 70, fontSize: 15 }}>
                    Class:
                </Text>
                <DropDownPicker
                    open={openClass}
                    value={valueClass}
                    items={filteredClasses}
                    setOpen={setOpenClass}
                    setValue={setValueClass}
                    setItems={setFilteredClasses}
                    placeholder="Select Class"
                    searchable={true}
                    searchPlaceholder="Search classes..."
                    onSearch={handleClassSearch}
                />
            </View>
            <View style={{...styles.dropdown, marginTop: 10, zIndex: 1}}>
                <Text style={{marginRight: 70, fontSize: 15 }}>
                    Topic:
                </Text>
                <DropDownPicker
                    open={openTopic}
                    value={valueTopic}
                    items={filteredTopics}
                    setOpen={setOpenTopic}
                    setValue={setValueTopic}
                    setItems={setFilteredTopics}
                    placeholder="Select Topic"
                    searchable={true}
                    searchPlaceholder="Search topics..."
                    onSearch={handleTopicSearch}
                    disabled={topics.length === 0}
                />
            </View>
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
            <TouchableOpacity 
                onPress={navigateToLearnScreen}
                style={{...styles.button, marginTop: 20, width: 280}}>
                <Text style={styles.buttonTextBlack}>Start</Text>
            </TouchableOpacity>
           
        </View>
    );
};

export default ClassSelectScreen;
