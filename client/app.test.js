import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import HomeScreen from './components/HomeScreen';
import { useNavigation } from '@react-navigation/native';



describe('HomeScreen', () => {
    it('should detect a press on TouchableOpacity', () => {
        const testButton = jest.fn()
        const { getByText, debug } = render(<HomeScreen />);
        // const pressMeButton = getByTestId("MyButton:Button:ClickMe");
        const button = getByTestId('PLEASEWORK')
        console.log('TouchableOpacity with "Get Started" found:', button);

        debug();
        act(() => {
            fireEvent.press(button);
        });
        debug();

        const navigation = useNavigation();
        console.log('Was navigate called:', navigation.navigate.mock.calls);
        expect(true);
    });
});

