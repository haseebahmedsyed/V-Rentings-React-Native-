import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo';

const Header = () => {
    const { success } = useSelector(state => state.loginReducer)
    const navigation = useNavigation()
    return (
        <View className='bg-[#00ccbb] h-16 flex-row justify-between items-center'>
            <Text className='font-bold text-2xl text-[#ebf6f7] ml-3'>V-Rentings</Text>
            {
                success ?
                <TouchableOpacity onPress={()=>navigation.toggleDrawer()} className='mr-3'>
                    <Entypo name='menu' size={33} color='#ffffff'/>
                    </TouchableOpacity> :
                    <TouchableOpacity className='bg-[#07b5a7] w-16 h-8 rounded-md mr-3' onPress={() => navigation.navigate('Login')}>
                        <Text className='text-white font-bold text-lg text-center'>Login</Text>
                    </TouchableOpacity>
                    


            }

        </View>
    )
}

export default Header