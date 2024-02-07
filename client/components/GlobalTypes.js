import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        backgroundColor: 'white'
        },
        inputContainer: {   
            width: 300
        },
        input: {
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
        }
})

