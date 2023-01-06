import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
    const navigation = useNavigation()
    return (
        <View className='bg-[#ebf6f7] h-14 flex-row justify-between items-center'>
            <Text className='font-bold text-2xl text-[#00ccbb] ml-3'>V-Rentings</Text>
            <TouchableOpacity className='bg-[#00ccbb] w-16 h-8 rounded-md mr-3' onPress={()=>navigation.navigate('Login')}>
                <Text className='text-white font-bold text-lg text-center'>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Header