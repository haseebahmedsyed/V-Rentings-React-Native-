import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Template = ({car}) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={()=>navigation.navigate('editCar',{car:car})} className='bg-[#ffffff] w-44 h-44 rounded-2xl ml-5 mt-5 shadow-2xl'>
      <Image
        source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCj3ptenifFkfKjY-PaDEDcy9RWVrCar6Ww&usqp=CAU'}}
        className='w-28 h-28 ml-auto mr-auto mt-auto mb-auto'
      />
      <Text className='text-2xl font-bold mt-auto mb-auto ml-auto mr-auto'>{car.name}</Text>
    </Pressable>
  )
}

export default Template