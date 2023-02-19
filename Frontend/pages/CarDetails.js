import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { calculateRent, getCar } from '../redux/actions/carsAction';
import { useDispatch, useSelector } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DetailsTab2 } from '../App';
import { useNavigation } from '@react-navigation/native';

const CarDetails = ({ route }) => {
    const dispatch = useDispatch()
    const { car } = useSelector(state => state.getCar)
    const navigation = useNavigation()
    useEffect(() => {
        console.log(route)
        dispatch(getCar(route.params.carID));
    }, [])

    return (
        <>
            <StatusBar backgroundColor="#00ccbb" barStyle="light-content" />
            <View className='bg-[#00ccbb] h-20'>
                <Text className='font-bold text-3xl text-[#ebf6f7] ml-3 text-center mt-5'>V-Rentings</Text>
            </View>
            <View className='bg-[#00ccbb] pl-2 flex-row items-center h-12'>
            <TouchableOpacity onPress={()=>navigation.goBack()}> 
                <Ionicons name='md-arrow-back' size={31} color='#ffffff' />
            </TouchableOpacity>
                <Text className='self-center font-bold ml-auto mr-auto text-2xl text-white'>Details</Text>
            </View>
            <View className='bg-[#00ccbb] pl-2 flex-row items-center h-12 pl-4'>
                <Text className='text-white text-xl font-bold'>Total- $ {(car.price) * calculateRent()}</Text>
            </View>
            <View className='bg-white flex-1'>
                <Text className='font-bold text-2xl ml-2 mt-2'>{car.type}</Text>
                <Text className='text-xl ml-3 text-gray-400'>{car.name} or similar</Text>
                <View>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCj3ptenifFkfKjY-PaDEDcy9RWVrCar6Ww&usqp=CAU' }}
                        className='h-40 w-full rounded-md ml-auto mr-auto -mt-1'
                        resizeMode='contain'
                    />
                </View>
                <View className='flex-row justify-around items-center'>
                    <View>
                        <View className='ml-auto mr-auto'>
                            <Fontisto name='persons' size={18} color='#000000' />
                        </View>
                        <Text className='text-lg font-bold text-gray-400'>{car.passengers} Passenger(s)</Text>
                    </View>
                    <View >
                        <View className='ml-auto mr-auto'>
                            <Fontisto name='shopping-bag' size={18} color='#000000' />
                        </View>
                        <Text className='text-lg font-bold text-gray-400'>{car.bags} Bag(s)</Text>
                    </View>
                    <View>
                        <View className='ml-auto mr-auto'>
                            <MaterialCommunityIcons name='temperature-celsius' size={21} color='#000000' />
                        </View>
                        <Text className='text-lg font-bold text-gray-400'>Air Condition</Text>
                    </View>
                </View>
            </View>
            <DetailsTab2 />

            <View className='bg-white mb-2'>
                <TouchableOpacity className='bg-[#00ccbb] h-12 w-72 ml-auto mr-auto rounded-full mt-2'>
                    <Text
                        className='text-center mt-auto mb-auto text-white font-bold text-2xl '
                    >
                        Book Now
                    </Text>
                </TouchableOpacity>

            </View>
        </>
    )
}

export default CarDetails