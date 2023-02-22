import { View, Text, Modal, StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const RentModal = ({ rent, index }) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const [showModal,setShowModal] = useState(false)

    const dealWithDate=(milliseconds)=>{
        return new Date(Number(milliseconds))
    }

    return (
        <>
            <Modal
            key={rent.id}
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView2}>
                        <View>
                            <Text className='text-3xl font-bold text-gray-400'>Person Info</Text>
                        </View>
                        <View className='w-full h-0.5 bg-gray-300'/>
                        <View className='pl-1.5'>
                            <View className='flex-row items-center space-x-3'>
                            <Text className='text-lg font-bold text-gray-500'>Name :</Text>
                            <Text className='text-lg font-bold text-gray-500'>{rent.user.name}</Text>
                            </View>
                            <View className='flex-row items-center space-x-3'>
                            <Text className='text-lg font-bold text-gray-500'>Email : </Text>
                            <Text className='text-lg font-bold text-gray-500'>{rent.user.email}</Text>
                            </View>
                            <View className='flex-row items-center space-x-3'>
                            <Text className='text-lg font-bold text-gray-500'>Phone : </Text>
                            <Text className='text-lg font-bold text-gray-500'>{rent.user.phone}</Text>
                            </View>
                        </View>

                        <View>
                            <Text className='text-3xl font-bold text-gray-400 mt-5'>Rent Info</Text>
                        </View>
                        <View className='w-full h-0.5 bg-gray-300'/>
                        <View className='pl-1.5'>
                            <View className='flex-row items-center space-x-3'>
                            <Text className='text-lg font-bold text-gray-500'>Booking Date :</Text>
                            <Text className='text-lg font-bold text-gray-500'>{`${dealWithDate(rent.bookingDate).getDate()}-${months[dealWithDate(rent.bookingDate).getMonth()]}-${dealWithDate(rent.bookingDate).getFullYear()}`}</Text>
                            </View>
                            <View className='flex-row items-center space-x-3'>
                            <Text className='text-lg font-bold text-gray-500'>From : </Text>
                            <Text className='text-lg font-bold text-gray-500'>{`${dealWithDate(rent.startDate).getDate()}-${months[dealWithDate(rent.startDate).getMonth()]}-${dealWithDate(rent.startDate).getFullYear()}`}</Text>
                            </View>
                            <View className='flex-row items-center space-x-3'>
                            <Text className='text-lg font-bold text-gray-500'>To : </Text>
                            <Text className='text-lg font-bold text-gray-500'>{`${dealWithDate(rent.endDate).getDate()}-${months[dealWithDate(rent.endDate).getMonth()]}-${dealWithDate(rent.endDate).getFullYear()}`}</Text>
                            </View>
                            <View className='flex-row items-center space-x-3'>
                            <Text className='text-lg font-bold text-gray-500'>Days : </Text>
                            <Text className='text-lg font-bold text-gray-500'>{rent.days}</Text>
                            </View>
                            <View className='flex-row items-center space-x-3'>
                            <Text className='text-lg font-bold text-gray-500'>Total Rent : </Text>
                            <Text className='text-lg font-bold text-gray-500'>$-{rent.rentPrice}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={()=>setShowModal(true)} key={index} className='flex-row items-center space-x-7 ml-auto mr-auto bg-[#E4E5E6] rounded-lg pl-2 pr-2 mt-3'>
                <View className='flex-column items-center'>
                    <Text className='text-lg text-gray-400 font-bold'>{dealWithDate(rent.bookingDate).getFullYear()}</Text>
                    <Text className='text-3xl text-[#00ccbb] font-bold'>{dealWithDate(rent.bookingDate).getDate()}</Text>
                    <Text className='text-lg text-gray-400 font-bold'>{months[dealWithDate(rent.bookingDate).getMonth()]}</Text>
                </View>
                <View className='flex-column items-center'>
                    <Text className='text-lg text-gray-600 font-bold' >{rent.user.name}</Text>
                    <Text className='text-lg text-gray-400 font-bold' >{rent.user.phone}</Text>
                </View>
                <View className='flex-column items-center'>
                    <Text className='text-lg text-gray-400 font-bold'>Total</Text>
                    <Text className='text-xl text-gray-600 font-bold'>${rent.rentPrice}</Text>
                </View>
                <View className='flex-column items-center'>
                    <Text className='text-lg text-gray-400 font-bold'>Days</Text>
                    <Text className='text-xl text-gray-600 font-bold'>{rent.days}</Text>
                </View>
            </TouchableOpacity>
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
        // alignItems: 'center',
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
        width: Dimensions.get('window').width/1.02,
        height: Dimensions.get('window').height/2.2,
        borderRadius:15
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

export default RentModal