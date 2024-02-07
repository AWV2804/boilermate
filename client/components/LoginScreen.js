import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Home from './HomeScreen.js'
import { useNavigation } from '@react-navigation/native';
import { styles } from './GlobalTypes.js'
import { auth } from '../firebase.js'

//import { useState } from 'react/cjs/react.production.min.js';
const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user.email)
                // ...
            })
            .catch((error) => {
                var errorCode = alert(error.code);
                var errorMessage = alert(error.message);
                // ..
            });
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                >
                </TextInput>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                >
                </TextInput>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style= {{marginTop: 20}}>
                    <View style={styles.button}>
                        <Text style={styles.buttonTextBlack}>Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style= {{marginTop: 5}}>
                    
                    <Text style={styles.buttonTextBlue}>Don't have an account? Sign up</Text>
              
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 0,
//         // backgroundColor: 'white'
//         },
//         inputContainer: {   
//             width: 300
//         },
//         input: {
//             backgroundColor: '#ddd',
//             borderRadius: 10, // Add this line to make the input boxes rounded
//             //backgroundColor: '#f5f5f5',
//             padding: 10,
//             marginVertical: 5,
//             height: 50,
//             borderRadius: 10 // Add this line to make the input boxes rounded
//         },
//         button: {
//             marginHorizontal: 2,
//             marginVertical: 4,
//             padding: 10,
//             borderRadius: 10,
//             width: 300,
//             height: 50,
//             backgroundColor: '#C28E0C',
//         },
//         buttonText: {
            
//             color: 'black',
//             //backgroundColor: '#C28E0C',
//             textAlign: 'center',
//             marginTop: 5,
//             fontSize: 16,
//         }
// })
