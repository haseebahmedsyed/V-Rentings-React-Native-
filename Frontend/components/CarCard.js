import { View, Text, Image } from 'react-native'
import React from 'react'


const CarCard = () => {
    return (
        <>
            <View className=' w-96 bg-[#ffffff] ml-auto mr-auto rounded-3xl mt-4'>
                <View className='flex-row items-center mt-5'>
                    <View className='w-60 pl-3'>
                        <Text className='text-3xl font-bold'>Economy</Text>
                        <Text className='ml-1 mb-5 text-xl text-gray-400'>Civic os similar</Text>
                        <Text className='text-lg font-bold text-gray-400'>5 Passenger(s)</Text>
                        <Text className='text-lg font-bold text-gray-400'>2 Bag(s)</Text>
                        <Text className='text-lg font-bold text-gray-400'>Distance from pickup location :</Text>
                        <Text className='text-lg font-bold text-gray-400'>10.1 km</Text>
                    </View>
                    <Image
                        source={require('../components/Car.jpg')}
                        className='h-32 w-32 rounded-md'
                    />
                </View>
                <Text className='text-3xl font-bold text-black text-right mr-4'>$200 /day</Text>
                <Text className='text-2xl font-bold text-gray-400 text-right mr-5 mb-3'>Total $200</Text>
            </View>
        </>
    )
}

export default CarCard