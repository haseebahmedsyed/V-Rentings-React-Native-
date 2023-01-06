import { View, Text, SafeAreaView, TextInput, PermissionsAndroid,TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const Home = ({ route }) => {
  const navigation = useNavigation()
  const { latitude, longitude } = route.params

  return (
    <SafeAreaView>
      <View className='w-full h-full'>
        <MapView
          className='flex-1 w-full h-full'
          initialRegion={{
            // latitude: 24.883041,
            // longitude: 67.194049 ,
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={(r) => console.log(r)}
        >
          <Marker
            coordinate={{
              latitude:latitude,
            longitude:longitude
            }}
          />
        </MapView>

      <TouchableOpacity className='flex mt-5 bg-[#00ccbb] w-72 h-12 rounded-lg text-center justify-center items-center ml-auto mr-auto mb-3' onPress={()=>navigation.navigate('carlist')}>
        <Text className='text-white font-bold text-xl'>Search</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Home