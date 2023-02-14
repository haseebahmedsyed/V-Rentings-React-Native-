import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home1 from './components/Home1';
import DrawerContent from './DrawerContent';

export const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>}>
      <Drawer.Screen name="Home1" component={Home1} options={{
        headerShown:false,
        drawerPosition:'right',
        drawerType:'front',
        drawerStatusBarAnimation:'fade'
      }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator
