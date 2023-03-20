import { View, Text, TouchableOpacity, StatusBar, ScrollView, Modal, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CarCard from '../components/CarCard'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '../components/Accordion';
import { List } from 'react-native-paper';
import FilterModal from './FilterModal';
import SortModal from './SortModal';


const CarList = () => {
    const { cars } = useSelector(state => state.getCars)
    const { price: price1, size: size1, transmission: transmission1 } = useSelector(state => state.filterReducer)
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const { width, height } = Dimensions.get('window')

    return (
        <ScrollView className='flex-1 mb-2'>

            <FilterModal modal1={modal1} setModal1={setModal1} />
            <SortModal modal2={modal2} setModal2={setModal2} />

            <StatusBar backgroundColor="#00ccbb" barStyle="light-content" />

            <View className='bg-[#00ccbb] h-36'>
                <Text
                    style={{
                        fontSize: width * 0.07,
                        marginTop: '4%'
                    }}
                    className='font-bold text-[#ebf6f7] text-center'>V-Rentings</Text>
                <View className='ml-auto mr-auto mt-2.5'>
                    <Text
                        style={{
                            fontSize: width * 0.045
                        }}
                        className='text-gray-500 text-[#ebf6f7]'>7 jan,2023 - 14 jan,2023</Text>
                </View>
                <View className='flex-row space-x-2 justify-end items-center ml-auto mr-auto'>
                    <TouchableOpacity
                        style={{
                            height: '45%',
                            width: '30%',
                        }}
                        onPress={() => setModal1(true)} className='bg-[#07b5a7] rounded-md '>
                        <Text style={{fontSize:width*0.04}} className='text-white text-center mt-auto mb-auto'>Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: '45%',
                            width: '30%'
                        }}
                        onPress={() => setModal2(true)} className='bg-[#07b5a7] rounded-md'>
                        <Text style={{fontSize:width*0.04}} className='text-white text-center mt-auto mb-auto'>Sort</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='bg-[#ffffff] h-12 mt-3 border border-green-400 w-11/12 ml-auto mr-auto'>
                <View className='mt-auto mb-auto flex-row items-center space-x-4'>
                    <View className='ml-5'>
                        <FontAwesome name='check-circle' size={20} color='#00ccbb' />
                    </View>
                    <Text
                        style={{
                            fontSize: width * 0.044
                        }}
                        className='text-center text-[#00ccbb] '>Book today with flexible cancellation</Text>
                </View>
            </View>

            <View className='mt-3'>
                {
                    cars.length > 0 ? cars.map((car) => {
                        return (
                            <View key={car.id}>
                                <CarCard car={car} />
                            </View>
                        )
                    }) :
                        <View>
                            <Text className='text-lg ml-3 mr-3'>Sorry, we couldn't find any results matching your search criteria. Global shortages are currently affecting car rental supply. Changing your search criteria may help.</Text>
                        </View>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: '#00000099'
    },
    modalView: {
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 350,
        height: 320
    },
    modalView2: {
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 350,
        height: 350
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#00ccbb',
        backgroundColor: '#ffffff',
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    list: {
        width: 300,
        backgroundColor: '#ffffff',
        color: 'white'
    }
});


export default CarList