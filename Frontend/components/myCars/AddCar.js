import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import CarLocaton from './CarLocation';
import { carBagsList, carPassengersList, carTransmissionList, carTypeList } from './DataLists'

const AddCar = ({ addCar, setAddCar }) => {

    const [showTypeDropdown, setShowTypeDropdown] = useState(false)
    const [showTransmissionDropdown, setShowTransmissionDropdown] = useState(false)
    const [showBagsDropdown, setShowBagsDropdown] = useState(false)
    const [showPassengersDropdown, setShowPassengersDropdown] = useState(false)
    const [type, setType] = useState('')
    const [transmission, setTransmission] = useState('')
    const [bags, setBags] = useState('')
    const [passengers, setPassengers] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [showMap, setShowMap] = useState(false)

    const [bagList, setBagList] = useState(carBagsList)
    const [passengersList, setPassengersList] = useState(carPassengersList)
    const [transmissionList, setTransmissionList] = useState(carTransmissionList)
    const [typeList, setTypeList] = useState(carTypeList)

    return (
        <>
            <CarLocaton showMap={showMap} setShowMap={setShowMap}
                setAddCar={setAddCar}
                carCred={{
                    type,
                    transmission,
                    bags: Number(bags),
                    passengers: Number(passengers),
                    name,
                    price: Number(price)
                }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={addCar}
                onRequestClose={() => {
                    setAddCar(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView2}>
                        <View className='ml-auto mr-auto mt-20'>
                            <Text className='text-4xl text-[#00ccbb] font-bold tracking-widest text-center mb-3'>Add Your Car</Text>
                            <TextInput
                                style={styles.len}
                                className='border border-gray-400 mt-7 w-96 pl-5 text-xl text-gray-500 rounded-md mb-5'
                                autoCapitalize='none'
                                autoComplete='off'
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                placeholder='Name'
                                onChangeText={(txt) => setName(txt)}
                            />
                            <DropDownPicker
                                className={`border border-gray-400 mt-2 pl-5 text-xl text-gray-500 mb-5 ${showTypeDropdown && 'mb-48'}`}
                                open={showTypeDropdown}
                                value={type}
                                items={typeList}
                                setOpen={setShowTypeDropdown}
                                setValue={setType}
                                setItems={setTypeList}
                                onSelectItem={(item) => setType(item.value)}
                                placeholder={"Type"}
                                textStyle={{
                                    fontSize: 20,
                                    color: 'gray'
                                }}
                                containerStyle={{
                                    zIndex: 1
                                }}
                            />
                            <TextInput
                                style={styles.len}
                                className='border border-gray-400 mt-2 w-96 rounded-md pl-5 text-xl text-gray-500 mb-5'
                                autoCapitalize='none'
                                autoComplete='off'
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                placeholder='Price'
                                onChangeText={(txt) => setPrice(txt)}
                                keyboardType='numeric'
                            />
                            <DropDownPicker
                                className={`border border-gray-400 mt-2 pl-5 text-xl text-gray-500 mb-5 ${showPassengersDropdown && 'mb-28'}`}
                                open={showPassengersDropdown}
                                value={passengers}
                                items={passengersList}
                                setOpen={setShowPassengersDropdown}
                                setValue={setPassengers}
                                setItems={setPassengersList}
                                onSelectItem={(item) => setPassengers(item.value)}
                                placeholder={"Passengers"}
                                textStyle={{
                                    fontSize: 20,
                                    color: 'gray'
                                }}
                            />

                            <DropDownPicker
                                className={`border border-gray-400 mt-2 pl-5 text-xl text-gray-500 mb-5 ${showTransmissionDropdown && 'mb-20'}`}
                                open={showTransmissionDropdown}
                                value={transmission}
                                items={transmissionList}
                                setOpen={setShowTransmissionDropdown}
                                setValue={setTransmission}
                                setItems={setTransmissionList}
                                onSelectItem={(item) => setTransmission(item.value)}
                                placeholder={"Transmission"}
                                textStyle={{
                                    fontSize: 20,
                                    color: 'gray'
                                }}
                            />
                            <DropDownPicker
                                className={`border border-gray-400 mt-2 pl-5 text-xl text-gray-500 mb-5`}
                                open={showBagsDropdown}
                                value={bags}
                                items={bagList}
                                setOpen={setShowBagsDropdown}
                                setValue={setBags}
                                setItems={setBagList}
                                onSelectItem={(item) => setBags(item.value)}
                                placeholder={"Bags"}
                                textStyle={{
                                    fontSize: 20,
                                    color: 'gray'
                                }}
                            />
                            <TouchableOpacity onPress={() => setShowMap(true)} className='mt-7 bg-[#00ccbb] h-12 rounded-md text-center justify-center items-center'
                            >
                                <Text className='text-white font-bold text-xl'>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
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
    modalView2: {
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 0,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // width: 420,
        // height: 770
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
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
    },
    len: {
        width: 370
    }
});

export default AddCar