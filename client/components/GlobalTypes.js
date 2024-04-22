import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        },
        inputContainer: {   
            width: 300
        },
        input: {
            //width: 300,
            backgroundColor: '#ddd',
            borderRadius: 10, // Add this line to make the input boxes rounded
            //backgroundColor: '#f5f5f5',
            padding: 10,
            marginVertical: 5,
            height: 50,
            borderRadius: 10 // Add this line to make the input boxes rounded
        },
        button: {
            marginHorizontal: 2,
            marginVertical: 4,
            padding: 10,
            borderRadius: 12,
            width: 300,
            height: 50,
            backgroundColor: '#C28E0C',
        },
        buttonTextBlack: {
            color: 'black',
            textAlign: 'center',
            marginTop: 5,
            fontSize: 18,
        },
        buttonTextBlue: {
            color: '#007AFF',
            textAlign: 'center',
            marginTop: 5,
            fontSize: 18,
        },
        buttonTextRed: {
            color: '#880808',
            textAlign: 'center',
            marginTop: 5,
            fontSize: 18,
        },
        inputBox: {
            width: 300,
            backgroundColor: '#ddd',
            borderRadius: 10, // Add this line to make the input boxes rounded
            //backgroundColor: '#f5f5f5',
            padding: 10,
            marginVertical: 5,
            height: 50,
            borderRadius: 10 // Add this line to make the input boxes rounded
        },
        navigationBar: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#f2f2f2',
            height: 70,
            width: '100%',
            position: 'absolute',
            bottom: 0,
        },
        navButton: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        dropdownLabel: {
            fontSize: 18,
            marginBottom: 10,
        },
        dropdown: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#f2f2f2',
            height: 60,
            width: 240,
            bottom: 10,
        },
        inputSelect: {
            flex: 1,
            margin: 2,
          },
        // Add these styles to your styles.js or wherever you manage styles
        thumbnail: {
            width: 300,
            height: 168,
            borderRadius: 6 // Optional: for rounded corners
        },
        title: {
            color: 'blue',
            textDecorationLine: 'underline',
            marginVertical: 8,
            flexWrap: 'wrap'
        },
        itemContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            width: 300,              // Adjust width according to your layout needs
            marginVertical: 10,      // Space between items vertically
            paddingHorizontal: 10
        },
        tabSelector: {
            flexDirection: 'row', // Lays out the tabs in a row
            justifyContent: 'center', // Centers the tabs in the container
            paddingVertical: 10, // Vertical padding around the tabs
            backgroundColor: '#f8f8f8', // Background color of the tab bar
            borderBottomWidth: 1, // Adds a subtle line to the bottom of the tab bar
            borderBottomColor: '#e1e1e1' // Color of the bottom border
        },

        tabButton: {
            flex: 1, // Each button will take equal space
            alignItems: 'center', // Centers content horizontally within each tab
            paddingVertical: 10, // Vertical padding for touch area
        },

        tabButtonActive: {
            borderBottomWidth: 3, // Highlights the active tab with a thicker bottom border
            borderBottomColor: '#C28E0C', // Color of the active tab indicator
            fontWeight: 'bold' // Makes the text of the active tab bold
        },

        tabText: {
            fontSize: 16, // Size of the text within tabs
            color: '#333', // Color of the text
            fontWeight: 'normal' // Normal text weight for inactive tabs
        }

        
})

