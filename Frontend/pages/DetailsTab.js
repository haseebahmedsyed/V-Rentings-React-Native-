import { View, Text } from 'react-native'
import React from 'react'
import Included from './Included';
import Supplier from './Supplier';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const DetailsTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Included" component={Included} />
      <Tab.Screen name="Supplier" component={Supplier} />
    </Tab.Navigator>
  )
}

export default DetailsTab