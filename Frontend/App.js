import React from 'react';
import {Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './components/Home';
import Home1 from './components/Home1';
import CarList from './pages/CarList';
import DrawerNavigator from './DrawerNavigator';
import CarDetails from './pages/CarDetails';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Included from './pages/Included';
import Supplier from './pages/Supplier';
import AddCar from './components/myCars/AddCar';
import EditCar from './components/myCars/EditCar';
import PresentRents from './components/myCars/PresentRents';
import PastRents from './components/myCars/PastRents';
import Octicons from 'react-native-vector-icons/Octicons';
import MyCurrentRents from './components/myRents/MyCurrentRents';
import MyPastRents from './components/myRents/MyPastRents';
import Header from './components/Header';


const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export function CarRents({route}){
  const {rents} = route.params
  return (
    <>
    <Tab.Navigator
    screenOptions={({route})=>({
      tabBarLabelStyle:{fontSize:18 , fontWeight:'bold',color:'#00ccbb'}
    })} 
    >
      <Tab.Screen name="Current" initialParams={{rents:rents}} component={PresentRents} />
      <Tab.Screen name="Past" initialParams={{rents:rents}} component={PastRents} />
    </Tab.Navigator>
    </>
  )
}

export function MyRents({route}){
  return (
    <>
    <Header/>
    <Tab.Navigator
    screenOptions={({route})=>({
      tabBarLabelStyle:{fontSize:18 , fontWeight:'bold',color:'#00ccbb'}
    })} 
    >
      <Tab.Screen name="Current" component={MyCurrentRents} />
      <Tab.Screen name="Past" component={MyPastRents} />
    </Tab.Navigator>
    </>
  )
}

export function DetailsTab2({route}){
  const {width, height} = Dimensions.get('window')
  return (
    <>
    <Tab.Navigator
    screenOptions={({route})=>({
      tabBarLabelStyle:{fontSize:width*0.038 , fontWeight:'bold',color:'#00ccbb'},
      tabBarIndicatorStyle:{
        backgroundColor:'#00ccbb'
      }
    })} 
    >
      <Tab.Screen name="Included" component={Included} />
      <Tab.Screen name="Supplier" component={Supplier} />
    </Tab.Navigator>
    </>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Login'
      >
        <Stack.Screen name="Login" component={Login} options={{
          headerShown: false
        }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Home2" component={Home} options={{
          headerStyle: {
            backgroundColor: '#00ccbb',
          },
          headerTitleStyle: {
            color: '#ffffff'
          },
          headerTintColor: '#ffffff',
          title: 'Select Location',
          headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="Home" component={DrawerNavigator} options={{
          headerShown: false
        }} />
        <Stack.Screen name="carlist" component={CarList} options={{
          headerShown: false
        }} />
        <Stack.Screen name="cardetail" component={CarDetails} options={{
          headerShown: false
        }} />
        <Stack.Screen name="editCar" component={EditCar} options={{
          headerShown: false
        }} /> 
        <Stack.Screen name="carrents" component={CarRents}
        options={{
          headerTitle:'Rents',
          headerStyle:{backgroundColor:'#00ccbb'},
          headerTitleStyle:{color:'#ffffff',fontSize:22},
          headerTintColor:'#ffffff'
          
        }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
