import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import Template from './Template'
import { useSelector } from 'react-redux'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import AddCar from './AddCar'

const MyCars = () => {
  const { cars } = useSelector(state => state.loginReducer)
  console.log(cars[2].rents)
  const navigation = useNavigation()
  const [addCar,setAddCar] = useState(false)


  return (
    <View className='bg-[#ffffff0] h-full w-full'>
      <Header />
      <AddCar addCar={addCar} setAddCar={setAddCar}/>
      <FlatList
        data={cars && cars}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (<Template car={item} />)}
      />

      <View className='bg-[#00ccbb] absolute rounded-full bottom-5 right-4 w-16 h-16'>
        <TouchableOpacity onPress={()=>setAddCar(true)} className='bg-[#00ccbb] w-16 h-16 rounded-full'>
          <View className='ml-auto mr-auto mt-auto mb-auto'>
            <FontAwesome name='plus' size={30} color='#ffffff' />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}


export default MyCars