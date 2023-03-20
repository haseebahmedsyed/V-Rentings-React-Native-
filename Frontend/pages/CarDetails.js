import { View, Text, TouchableOpacity, StatusBar, Image, Dimensions } from 'react-native'
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
import { ERROR_RESET } from '../redux/constants/accountConstants'


const CarDetails = ({ route }) => {
    const dispatch = useDispatch()
    const { car } = route.params
    const { success, loading, error } = useSelector(state => state.addCar)
    const navigation = useNavigation()
    const [images, setImages] = useState([])
    const { height, width } = Dimensions.get('window')

    useEffect(() => {
        let carImg = []
        for (let x of car.images) {
            carImg.push(x.url)
        }
        setImages(carImg)
    }, [])

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
            <View className='bg-[#00ccbb] pl-2 flex-row items-center h-20'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='md-arrow-back' size={27} color='#ffffff' />
                </TouchableOpacity>
                <View className='flex-column justify-center items-center ml-auto mr-auto w-ful'>
                    <Text style={{ fontSize: width * 0.065, fontWeight: 'bold' }} className='text-white'>{car.type}</Text>
                    <Text style={{ fontSize: width * 0.05 }} className='text-gray-100'>{car.name} or similar</Text>
                </View>
            </View>
            <View className='bg-[#00ccbb] flex-row items-center pl-4 h-12'>
                <Text style={{ fontSize: width * 0.05, textAlign: 'center' }} className='text-white'>Total- $ {(car.price) * calculateRent()}</Text>
            </View>
            <View className='bg-white'>
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
                                style={{ height: height / 4.5, width: width }}
                                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCj3ptenifFkfKjY-PaDEDcy9RWVrCar6Ww&usqp=CAU' }}
                                className='rounded-md ml-auto mr-auto'
                                resizeMode='contain'
                            />
                        </View>
                }
                <View className='flex-row justify-around items-center mb-2'>
                    <View>
                        <View className='ml-auto mr-auto'>
                            <Fontisto name='persons' size={18} color='#000000' />
                        </View>
                        <Text style={{ fontSize: width * 0.045 }} className='text-gray-400'>{car.passengers} Passenger(s)</Text>
                    </View>
                    <View >
                        <View className='ml-auto mr-auto'>
                            <Fontisto name='shopping-bag' size={18} color='#000000' />
                        </View>
                        <Text style={{ fontSize: width * 0.045 }} className='text-gray-400'>{car.bags} Bag(s)</Text>
                    </View>
                    <View>
                        <View className='ml-auto mr-auto'>
                            <MaterialCommunityIcons name='temperature-celsius' size={21} color='#000000' />
                        </View>
                        <Text style={{ fontSize: width * 0.045 }} className='text-gray-400'>Air Condition</Text>
                    </View>
                </View>
            </View>
            <DetailsTab2 />

            <View className='bg-white' style={{
                height:'7%'
            }}>
                <TouchableOpacity
                    style={{
                        width: '75%',
                        height: '80%'
                    }}
                    onPress={() => dispatch(bookCar(car.id))} className='bg-[#00ccbb] h-12 w-72 ml-auto mr-auto rounded-full mt-2'>
                    <Text
                        style={{
                            fontSize:width*0.046
                        }}
                        className='text-center mt-auto mb-auto text-white font-bold '
                    >
                        Book Now
                    </Text>
                </TouchableOpacity>

            </View>
        </>
    )
}

export default CarDetails