// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { StatusBar } from 'react-native';
import { Text } from 'react-native';
// import Boilermate from './components/Boilermate.js';




// export default function App() {
//   return (
//     <NavigationContainer>
//       <PaperProvider>
//             <Boilermate />
//       </PaperProvider>
//     </NavigationContainer>
//   );
// }

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hi this is Andrew and he's losing his mind!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
