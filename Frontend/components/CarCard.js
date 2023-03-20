import { View, Text, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { calculateRent } from '../redux/actions/carsAction';

const CarCard = ({ car }) => {
    let rentPrice = calculateRent() * car.price
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window')

    const handleCarDetailsPress = () => {
        navigation.navigate('cardetail', { car: car })
    }

    return (
        <>
            <View
                style={{
                    width: width / 1.05,
                    marginTop: '3%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: width * 0.059
                }}
                key={car.id} className='bg-[#ffffff] shadow-2xl'>
                <Pressable className='flex-row items-center justify-center' onPress={handleCarDetailsPress}>
                    <View
                        style={{
                            width: '58%',
                            paddingLeft: '3%'
                        }}
                        className=''>
                        <Text
                            style={{
                                fontSize: width * 0.06,
                                marginTop: '2%'
                            }}
                            className='font-bold text-gray-400'>{car.type}</Text>
                        <Text
                            style={{
                                fontSize: width * 0.05,
                                marginLeft: '2%',
                                marginBottom: '5%'
                            }}
                            className='font-bold text-gray-300'>{car.name} or similar</Text>
                        <View className='flex-row items-center space-x-2'>
                            <Fontisto name='persons' size={18} color='#00ccbb' />
                            <Text
                                style={{
                                    fontSize: width * 0.044
                                }}
                                className='text-gray-400'>{car.passengers} Passenger(s)</Text>
                        </View>
                        <View className='flex-row items-center space-x-3'>
                            <Fontisto name='shopping-bag' size={18} color='#00ccbb' />
                            <Text
                                style={{
                                    fontSize: width * 0.044
                                }}
                                className='text-gray-400'>{car.bags} Bag(s)</Text>
                        </View>
                        <View className='flex-row space-x-2 items-center'>
                            <View className='mt-1'>
                                <Entypo name='location' size={18} color='#00ccbb' />
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontSize: width * 0.044
                                    }}
                                    className='text-gray-400'>10.1 km away</Text>
                            </View>
                        </View>
                    </View>
                    <Image
                        // source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT55HhY6wkGytt-b_avdpiZB89Waooko-x-YQ7z3jjkSLdUBddYF_eju261C_VFDps-Aeo&usqp=CAU'}}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCj3ptenifFkfKjY-PaDEDcy9RWVrCar6Ww&usqp=CAU' }}
                        // className='h-32 w-32 rounded-md'
                        style={{
                            width: '40%',
                            height: '70%'
                        }}
                        resizeMode='contain'
                    />
                </Pressable>
                <Text
                    style={{
                        marginRight: '4%',
                        fontSize: width * 0.05
                    }}
                    className='font-bold text-gray-600 text-right'>${car.price} /day</Text>
                <Text
                    style={{
                        marginRight: '4%',
                        fontSize: width * 0.04,
                        marginBottom:'5%',
                        marginTop:'2%'
                    }}
                    className='text-gray-400 text-right font-bold'>Total ${rentPrice}</Text>
            </View>
        </>
    )
}

export default CarCard