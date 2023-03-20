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
  const navigation = useNavigation()
  const [addCar, setAddCar] = useState(false)


  return (
    <View className='h-full w-full'>
      <Header />
      <AddCar addCar={addCar} setAddCar={setAddCar} />
        <FlatList
          style={{
            height:'100%',
            width:'100%'
          }}
          // columnWrapperStyle={{ marginLeft:'auto', marginRight:'auto'}}
          data={cars && cars}
          extraData={cars}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (<Template car={item} />)}
        />

      <View className='bg-[#00ccbb] absolute rounded-full bottom-6 right-5 w-14 h-14'>
        <TouchableOpacity onPress={() => setAddCar(true)} className='bg-[#00ccbb] w-14 h-14 rounded-full'>
          <View className='ml-auto mr-auto mt-auto mb-auto'>
          
            <FontAwesome name='plus' size={25} color='#ffffff' />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}


export default MyCars