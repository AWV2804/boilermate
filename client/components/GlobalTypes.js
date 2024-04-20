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
            width: 120,
            height: 90,
            borderRadius: 6 // Optional: for rounded corners
        },
        title: {
            color: 'blue',
            textDecorationLine: 'underline',
            marginVertical: 8,
            flexWrap: 'wrap'
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10
        }
})

