import { View, Text,Linking,Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Supplier = () => {
  const { car } = useSelector(state => state.getCar)

  const dialHandler =()=>{
    console.log("hiii")
    let number = ''; 
    if (Platform.OS === 'android') {
      number = `tel:${car.user.phone}`; 
    }
    else {
      number = 'telprompt:091123456789';
    }
    Linking.openURL(number);
  }

  return (
    <View className='flex-1 bg-white mt-4'>
      <View className='flex-row items-center space-x-6 mt-3 bg-[#00000020] h-14 w-72 ml-auto mr-auto pl-2'>
        <Fontisto name='person' size={25} color='#00ccbb' />
        <Text className='text-2xl font-bold '>{car?.user?.name}</Text>
      </View>

      <View className='flex-row items-center space-x-6 mt-3 bg-[#00000020] h-14 w-72 ml-auto mr-auto pl-4'>
        <Fontisto name='map-marker-alt' size={25} color='#00ccbb' />
        <Text className='text-2xl font-bold'>{car?.user?.address}</Text>
      </View>

      <Pressable className='w-72 rounded-lg h-10 bg-[#ffffff] ml-4 mt-4 flex-row justify-center items-center space-x-2 ml-auto mr-auto border border-[#00ccbb]' onPress={dialHandler}>
        <FontAwesome5 name='phone-alt' size={30} color='#00ccbb'/>
      </Pressable>
    </View>
  )
}

export default Supplier