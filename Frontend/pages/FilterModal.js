import { View, Text, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
    PRICE,
    SIZE,
    TRANSMISSION,
    CLEAR_ALL_FILTERS
} from '../redux/constants/filterConstants'
import { getCars } from '../redux/actions/carsAction';

const FilterModal = ({ modal1, setModal1 }) => {
    const [expanded, setExpanded] = useState(true);
    const dispatch = useDispatch();
    const { price, size, transmission } = useSelector(state => state.filterReducer)

    const handlePress = () => {
        setExpanded(!expanded)
    }

    useEffect(() => {
        dispatch(getCars())
    }, [size, transmission, price])
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal1}
            onRequestClose={() => {
                setModal1(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {/* <List.Section title="" titleStyle={styles.title}> */}
                            <>
                                <TouchableOpacity className='bg-red-300 w-32 h-8 items-center ml-auto mr-auto rounded-md mb-6' onPress={()=>{dispatch({type:CLEAR_ALL_FILTERS})
                                setModal1(false);
                                }}>
                                    <Text className='text-red-600 font-bold text-lg'>Clear Filters</Text>
                                </TouchableOpacity>
                                <List.Accordion
                                    title="Price"
                                    style={styles.list}
                                    titleStyle={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}
                                >
                                    <TouchableOpacity className='flex-row items-center' onPress={() => dispatch({ type: PRICE, payload: '100' })}>
                                        <List.Item title="$100 - $200"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                        />
                                        {
                                            price == '100' &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity className='flex-row items-center' onPress={() => dispatch({ type: PRICE, payload: '300' })}>
                                        <List.Item title="$300 - $400"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                        />
                                        {
                                            price == '300' &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity className='flex-row items-center' onPress={() => dispatch({ type: PRICE, payload: '500' })}>
                                        <List.Item title="$500 - onwards"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                        />
                                        {
                                            price == '500' &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </TouchableOpacity>
                                </List.Accordion>

                                <List.Accordion
                                    style={styles.list}
                                    titleStyle={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}
                                    title="Transmission"
                                    expanded={expanded}
                                    onPress={handlePress}>
                                    <View className='flex-row items-center'>
                                        <List.Item title="Automatic"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                            onPress={() => dispatch({ type: TRANSMISSION, payload: 'Automatic' })}
                                        />
                                        {
                                            transmission == 'Automatic' &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </View>
                                    <View className='flex-row items-center'>
                                        <List.Item title="Manual"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                            onPress={() => dispatch({ type: TRANSMISSION, payload: 'Manual' })}
                                        />
                                        {
                                            transmission == 'Manual' &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </View>
                                </List.Accordion>

                                <List.Accordion
                                    style={styles.list}
                                    titleStyle={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}
                                    title="Size"
                                    expanded={expanded}
                                    onPress={handlePress}>
                                    <View className='flex-row items-center'>
                                        <List.Item title="Economy"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                            onPress={() => dispatch({ type: SIZE, payload: 'Economy' })}
                                        />
                                        {
                                            size == "Economy" &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </View>
                                    <View className='flex-row items-center'>
                                        <List.Item title="Compact"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                            onPress={() => dispatch({ type: SIZE, payload: 'Compact' })}
                                        />
                                        {
                                            size == "Compact" &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </View>
                                    <View className='flex-row items-center'>
                                        <List.Item title="SUV"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                            onPress={() => dispatch({ type: SIZE, payload: 'SUV' })}
                                        />
                                        {
                                            size == "SUV" &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </View>
                                    <View className='flex-row items-center'>
                                        <List.Item title="Standard"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                            onPress={() => dispatch({ type: SIZE, payload: 'Standard' })}
                                        />
                                        {
                                            size == "Standard" &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </View>
                                    <View className='flex-row items-center'>
                                        <List.Item title="Intermediate"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                            onPress={() => dispatch({ type: SIZE, payload: 'Intermediate' })}
                                        />
                                        {
                                            size == "Intermediate" &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </View>
                                    <View className='flex-row items-center'>
                                        <List.Item title="7-seat minivan"
                                            titleStyle={{ color: 'black', fontSize: 18 }}
                                            style={{ flex: 0.8 }}
                                            onPress={() => dispatch({ type: SIZE, payload: 'Minivan' })}
                                        />
                                        {
                                            size == "Minivan" &&
                                            <View className='h-3 w-3 rounded-full bg-red-600' />
                                        }
                                    </View>

                                </List.Accordion>
                            </>
                        {/* </List.Section> */}
                    </ScrollView>

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

export default FilterModal