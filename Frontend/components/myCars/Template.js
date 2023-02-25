import { View, Text, Image, Pressable,StyleSheet,Modal, TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getCar } from '../../redux/actions/carsAction'

import { useNavigation } from '@react-navigation/native'

const Template = ({ car }) => {
  console.log(car)
  const navigation = useNavigation();
  const [showModal,setShowModal] = useState(false)
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>
            <View className='ml-auto mr-auto mt-auto mb-auto'>
              <TouchableOpacity onPress={() => {
                navigation.navigate('editCar', { car: car })
                setShowModal(false)
                }} className='bg-green-800 h-12 w-60 rounded-2xl'>
                <Text className='text-white font-bold text-xl text-center mt-auto mb-auto'>Edit Car</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{
                console.log(car.rents)
                navigation.navigate('carrents',{rents:car.rents})
                setShowModal(false)
                }} className='mt-3 bg-blue-800 h-12 w-60 rounded-2xl'>
                <Text className='text-white font-bold text-xl text-center mt-auto mb-auto'>Show Rents</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Pressable onPress={() => navigation.navigate('editCar', { car: car })} className='bg-[#ffffff] w-44 h-44 rounded-2xl ml-5 mt-5 shadow-2xl'> */}
      <Pressable onPress={() => setShowModal(true)} className='bg-[#ffffff] w-44 h-44 rounded-2xl ml-5 mt-5 shadow-2xl'>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCj3ptenifFkfKjY-PaDEDcy9RWVrCar6Ww&usqp=CAU' }}
          className='w-28 h-28 ml-auto mr-auto mt-auto mb-auto'
        />
        <Text className='text-2xl font-bold mt-auto mb-auto ml-auto mr-auto'>{car.name}</Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 22,
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
      width: 300,
      height: 200,
      borderRadius:40
      // width: Dimensions.get('window').width,
      // height: Dimensions.get('window').height
  }
});


export default Template