import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { addCar } from '../../redux/actions/carsAction';
import { getMe } from '../../redux/actions/accountActions';

const CarLocaton = ({ showMap, setShowMap, carCred,setAddCar }) => {
    const {location,date} = useSelector(state=>state.initLocation)
    const {success,error,loading} = useSelector(state=>state.addCar)
    const [latitude,setLatitude] = useState(location.latitude)
    const [longitude,setLongitude] = useState(location.longitude)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(success){
            dispatch(getMe())
            setShowMap(false)
            setAddCar(false)
        }
    },[success,error])

    const handleAddCar=()=>{
        dispatch(addCar({...carCred,location:{latitude:latitude.toString(),longitude:longitude.toString()}}))
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showMap}
            onRequestClose={() => {
                setShowMap(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView2}>
                    <View className='w-full h-full'>
                        <MapView
                            className='flex-1 w-full h-full'
                            initialRegion={{
                                // latitude: 24.883041,
                                // longitude: 67.194049 ,
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onRegionChange={(r) => {
                                setLatitude(r.latitude)
                                setLongitude(r.longitude)
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: latitude,
                                    longitude: longitude
                                }}
                            />
                        </MapView>
                        <View className='h-20 mt-3'>
                        <TouchableOpacity onPress={handleAddCar} className='flex bg-[#00ccbb] w-80 h-12 rounded-3xl text-center justify-center items-center ml-auto mr-auto'>
                            <Text className='text-white font-bold text-xl'>Add</Text>
                        </TouchableOpacity>
                        </View>
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
    modalView2: {
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 0,
        // padding: 20,
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

export default CarLocaton