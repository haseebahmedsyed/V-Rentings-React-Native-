import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { calculateRent } from '../redux/actions/carsAction';

const CarCard = ({ car }) => {
    let rentPrice = calculateRent() * car.price
    const navigation = useNavigation();

    const handleCarDetailsPress = () => {
        navigation.navigate('cardetail', { car: car })
    }

    return (
        <>
            <View key={car.id} className=' w-96 bg-[#ffffff] ml-auto mr-auto rounded-3xl mt-4 shadow-2xl'>
                <Pressable className='flex-row items-center mt-5' onPress={handleCarDetailsPress}>
                    <View className='w-60 pl-3'>
                        <Text className='text-3xl font-bold'>{car.type}</Text>
                        <Text className='ml-1 mb-5 text-xl text-gray-400'>{car.name} or similar</Text>
                        <View className='flex-row items-center space-x-2'>
                            <Fontisto name='persons' size={18} color='#00ccbb' />
                            <Text className='text-lg font-bold text-gray-400'>{car.passengers} Passenger(s)</Text>
                        </View>
                        <View className='flex-row items-center space-x-3'>
                            <Fontisto name='shopping-bag' size={18} color='#00ccbb' />
                            <Text className='text-lg font-bold text-gray-400'>{car.bags} Bag(s)</Text>
                        </View>
                        <View className='flex-row space-x-2'>
                            <View className='mt-1'>
                                <Entypo name='location' size={18} color='#00ccbb' />
                            </View>

                            <View>
                                <Text className='text-lg font-bold text-gray-400'>10.1 km away</Text>
                            </View>
                        </View>
                    </View>
                    <Image
                        // source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT55HhY6wkGytt-b_avdpiZB89Waooko-x-YQ7z3jjkSLdUBddYF_eju261C_VFDps-Aeo&usqp=CAU'}}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCj3ptenifFkfKjY-PaDEDcy9RWVrCar6Ww&usqp=CAU' }}
                        className='h-32 w-32 rounded-md'
                        resizeMode='contain'
                    />
                </Pressable>
                <Text className='text-2xl font-bold text-black text-right mr-4'>${car.price} /day</Text>
                <Text className='text-xl font-bold text-gray-400 text-right mr-5 mb-3'>Total ${rentPrice}</Text>
            </View>
        </>
    )
}

export default CarCard