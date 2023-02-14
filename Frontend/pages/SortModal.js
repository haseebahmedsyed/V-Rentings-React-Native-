import { View, Text, Modal, StyleSheet,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux'
import {
    SORT_BY_PRICE,
    SORT_BY_DISTANCE,
    SORT_BY_RATING,
    CLEAR_ALL_SORTS
} from '../redux/constants/filterConstants'
import { getCars } from '../redux/actions/carsAction';

const SortModal = ({ modal2, setModal2 }) => {
    const { sortPrice, sortDistance, sortRating } = useSelector(state => state.sortReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCars())
        console.log(sortRating)
    }, [sortPrice, sortDistance, sortRating])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal2}
            onRequestClose={() => {
                setModal2(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView2}>
                    {/* <View className='mt-3'>
                <Text className='text-3xl font-bold text-[#00ccbb]'>Sort</Text>
            </View> */}
                    <TouchableOpacity className='bg-red-300 w-32 h-8 items-center ml-auto mr-auto rounded-md mb-2' onPress={() => {
                        dispatch({ type: CLEAR_ALL_SORTS })
                        setModal2(false);
                    }}>
                        <Text className='text-red-600 font-bold text-lg'>Clear Sorts</Text>
                    </TouchableOpacity>
                    <View className='mt-8 border-t-2 border-l-2 border-r-2 border-[#00000099] w-full h-12 flex-row justify-center items-center space-x-6'>
                        <Text onPress={() => dispatch({ type: SORT_BY_PRICE })} className='text-center text-2xl font-bold mt-auto mb-auto text-black'>Price</Text>
                        {
                            sortPrice && <FontAwesome name='check' size={20} color='#00ccbb' />
                        }

                    </View>
                    <View className='border-t-2 border-l-2 border-r-2 border-[#00000099] w-full h-12 flex-row justify-center items-center space-x-6'>
                        <Text onPress={() => dispatch({ type: SORT_BY_RATING })} className='text-center text-2xl font-bold mt-auto mb-auto text-black'>Ratings</Text>
                        {
                            sortRating && <FontAwesome name='check' size={20} color='#00ccbb' />
                        }
                    </View>
                    <View className='mt- border-2 border-[#00000099] w-full h-12 flex-row justify-center items-center space-x-6'>
                        <Text onPress={() => dispatch({ type: SORT_BY_DISTANCE })} className='text-center text-2xl font-bold mt-auto mb-auto text-black'>Distance</Text>
                        {
                            sortDistance && <FontAwesome name='check' size={20} color='#00ccbb' />
                        }
                    </View>
                </View>
            </View>
        </Modal>
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
        height: 300
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

export default SortModal