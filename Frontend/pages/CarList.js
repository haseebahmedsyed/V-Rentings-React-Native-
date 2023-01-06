import { View, Text, TouchableOpacity, StatusBar,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CarCard from '../components/CarCard'

const CarList = () => {
    return (
        <ScrollView className='flex-1 mb-2'>
            <StatusBar backgroundColor="#00ccbb" barStyle="light-content" />
            <View className='bg-[#00ccbb] h-36'>
                <Text className='font-bold text-3xl text-[#ebf6f7] ml-3 text-center mt-5'>V-Rentings</Text>
                <View className='mt-2 ml-4'>
                    <Text className='text-gray-500 text-[#ebf6f7] text-lg font-bold'>7 jan,2023 - 14 jan,2023</Text>
                </View>
                <View className='flex-row space-x-2 flex-end justify-end mr-5 mt-2 items-center'>
                        <TouchableOpacity className='bg-[#07b5a7] w-24 h-9 rounded-md '>
                            <Text className='text-white text-lg text-center mt-auto mb-auto'>Filter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-[#07b5a7] w-24 h-9 rounded-md'>
                            <Text className='text-white text-lg text-center mt-auto mb-auto'>Sort</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            <View className='bg-[#ffffff] h-12 mt-3 border border-green-400 w-11/12 ml-auto mr-auto'>
                <Text className='text-lg text-center text-green-400 mt-auto mb-auto'>Book today with flexible cancellation</Text>
            </View>

            <View className='mt-3'>
            <CarCard/>
            <CarCard/>
            <CarCard/>
            <CarCard/>
            <CarCard/>
            </View>
        </ScrollView>
    )
}

export default CarList