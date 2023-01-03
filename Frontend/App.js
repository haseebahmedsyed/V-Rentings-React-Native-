import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './components/Home';
import Home1 from './components/Home1';

const Stack = createNativeStackNavigator();


const App= () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="Login" component={Login} options={{
          headerShown:false
        }} />
        {/* <Stack.Screen name="SignUp" component={SignUp} options={{
          headerShown:false
        }} />  */}
        <Stack.Screen name="Home2" component={Home} options={{
          headerStyle:{
            backgroundColor:'#00ccbb',
            
          },
          headerTitleStyle:{
            color:'#ffffff'
          },
          headerTintColor: '#ffffff',
          title:'Select Location',
          headerTitleAlign: 'center' 
        }} />
        <Stack.Screen name="Home1" component={Home1} options={{
          headerShown:false
        }} />
      </Stack.Navigator>
     </NavigationContainer>
  );
};


export default App;
