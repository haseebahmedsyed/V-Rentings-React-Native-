import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home1 from './components/Home1';
import DrawerContent from './DrawerContent';
import MyCars from './components/myCars/MyCars';
import MyRents from './components/myRents/MyRents';

export const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    screenOptions={()=>({
      drawerPosition:'right',
        drawerType:'front',
        drawerStatusBarAnimation:'fade'      
    })}
     drawerContent={props=><DrawerContent {...props}/>}>
      <Drawer.Screen name="Home1" component={Home1} options={{
        headerShown:false
      }} />
      <Drawer.Screen name="MyCars" component={MyCars} options={{
        headerShown:false
      }} />
      <Drawer.Screen name="MyRents" component={MyRents} options={{
        headerShown:false
      }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator
