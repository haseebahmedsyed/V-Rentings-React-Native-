import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { bookCar, calculateRent, getCar } from '../redux/actions/carsAction';
import { useDispatch, useSelector } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DetailsTab2 } from '../App';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from "react-native-image-slider-box";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import {ERROR_RESET} from '../redux/constants/accountConstants'


const CarDetails = ({ route }) => {
    const dispatch = useDispatch()
    const { car } = route.params
    console.log(car)
    // const { car } = useSelector(state => state.getCar)
    const { success, loading, error } = useSelector(state => state.addCar)
    const navigation = useNavigation()
    const [images, setImages] = useState([])

    useEffect(() => {
        let carImg = []
        for (let x of car.images) {
            carImg.push(x.url)
        }
        setImages(carImg)
    }, [])


    // useEffect(() => {
    //     console.log(route)
    //     dispatch(getCar(route.params.carID));
    // }, [])

    useEffect(() => {
        if (success) {
            navigation.navigate('MyRents')
        }
        if (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error Message',
                textBody: `${error}`
            })
            dispatch({
                type: ERROR_RESET
            })
        }
    }, [success, error])

    return (
        <>
            <StatusBar backgroundColor="#00ccbb" barStyle="light-content" />
            {/* <View className='bg-[#00ccbb] h-14'>
                <Text className='font-bold text-3xl text-[#ebf6f7] ml-3 text-center mt-5'>V-Rentings</Text>
            </View> */}
            <View className='bg-[#00ccbb] pl-2 flex-row items-center h-20'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='md-arrow-back' size={31} color='#ffffff' />
                </TouchableOpacity>
                <View className='flex-column justify-center items-center ml-auto mr-auto w-ful'>
                    <Text className='font-bold text-2xl text-white'>{car.type}</Text>
                    <Text className='font-bold text-xl text-gray-100'>{car.name} or similar</Text>
                </View>
            </View>
            <View className='bg-[#00ccbb] pl-2 flex-row items-center h-12 pl-4'>
                <Text className='text-white text-xl font-bold'>Total- $ {(car.price) * calculateRent()}</Text>
            </View>
            <View className='bg-white'>
                {/* <Text className='font-bold text-2xl ml-2'>{car.type}</Text>
                <Text className='text-xl ml-3 text-gray-400'>{car.name} or similar</Text> */}
                {
                    car?.images?.length > 0 ? <View className='h-52 w-full rounded-md ml-auto mr-auto  mb-1.5'>
                        <SliderBox
                            images={images}
                            sliderBoxHeight={210}
                            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                            dotColor="#00ccbb"
                            inactiveDotColor="#90A4AE"
                        />
                    </View> :
                        <View>
                            <Image
                                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCj3ptenifFkfKjY-PaDEDcy9RWVrCar6Ww&usqp=CAU' }}
                                className='h-48 w-full rounded-md ml-auto mr-auto -mt-1'
                                resizeMode='contain'
                            />
                        </View>
                }
                <View className='flex-row justify-around items-center mb-2'>
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
                <TouchableOpacity onPress={() => dispatch(bookCar(car.id))} className='bg-[#00ccbb] h-12 w-72 ml-auto mr-auto rounded-full mt-2'>
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