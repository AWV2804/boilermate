import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../GlobalTypes.js';
import DropDownPicker from 'react-native-dropdown-picker';
import userService from '../../user.service.js';

const ClassSelectScreen = () => {
    const navigate = useNavigation();

    const [openClass, setOpenClass] = useState(false);
    const [valueClass, setValueClass] = useState(null);
    const [classes, selectClass] = useState([
        { label: 'ECE 264', value: 'ECE 264' }
    ]);

    const [openTopic, setOpenTopic] = useState(false);
    const [valueTopic, setValueTopic] = useState(null);
    const [topic, selectTopic] = useState([
        { label: 'Huffman Tree', value: 'HUF' }
    ]);

    const [streaks, setStreaks] = useState(0);
    const [credits, setCredits] = useState(0);

    useEffect(() => {
        userService.getUser('andrewtu517@gmail.com')
        .then(data => {
            setStreaks(data.streaks);
            setCredits(data.credits);
        })
        .catch(error => {
            console.error('Error fetching videos', error);
        });

        
    }, []);

    const handleHomeNav = () => {
        navigate.navigate('Home');
    };

    const handleSettingsNav = () => {
        navigate.navigate('Settings');
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
            <View style={{...styles.dropdown, zIndex: 2}}>
                <Text style={{marginRight: 100, fontSize: 15 }}>
                    Class:
                </Text>
                <DropDownPicker
                    open={openClass}
                    value={valueClass}
                    items={classes}
                    setOpen={setOpenClass}
                    setValue={setValueClass}
                    setItems={selectClass}
                />
            </View>
            <View style={{...styles.dropdown, marginTop: 10, zIndex: 1}}>
                <Text style={{marginRight: 100, fontSize: 15 }}>
                    Topic:
                </Text>
                <DropDownPicker
                    open={openTopic}
                    value={valueTopic}
                    items={topic}
                    setOpen={setOpenTopic}
                    setValue={setValueTopic}
                    setItems={selectTopic}
                />
            </View>
            <TouchableOpacity 
                onPress={() => navigate.navigate('Learn')}
                style={{...styles.button, marginTop: 20, width: 280}}>
                <Text style={styles.buttonTextBlack}>Start</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ClassSelectScreen;