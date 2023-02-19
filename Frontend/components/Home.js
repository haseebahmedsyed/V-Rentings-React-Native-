import { View, Text, SafeAreaView, TextInput, PermissionsAndroid,TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { getCars } from '../redux/actions/carsAction';

const Home = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {cars,success} = useSelector(state=>state.getCars)
  const {location,date} = useSelector(state=>state.initLocation)
  const [latitude,setLatitude] = useState(location.latitude)
  const [longitude,setLongitude] = useState(location.longitude)

  const handleSearch=()=>{
    dispatch(getCars(date,{latitude:latitude,longitude:longitude}))
  }

  useEffect(()=>{
    if(success){
      navigation.navigate('carlist')
    }
  },[success,cars])

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
          onRegionChange={(r) => {
            setLatitude(r.latitude)
            setLongitude(r.longitude)
            }}
        >
          <Marker
            coordinate={{
              latitude:latitude,
            longitude:longitude
            }}
          />
        </MapView>

      <TouchableOpacity onPress={handleSearch} className='flex mt-5 bg-[#00ccbb] w-80 h-12 rounded-3xl text-center justify-center items-center ml-auto mr-auto mb-3'>
        <Text className='text-white font-bold text-xl'>Search</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Home