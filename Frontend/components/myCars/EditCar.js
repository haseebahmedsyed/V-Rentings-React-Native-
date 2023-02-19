import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { carBagsList, carPassengersList, carTransmissionList, carTypeList } from './DataLists'
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch,useSelector } from 'react-redux';
import { editCar } from '../../redux/actions/carsAction';
import { EDIT_CAR_RESET } from '../../redux/constants/carConstants';

const EditCar = ({ route }) => {
  const dispatch = useDispatch()
  const { car } = route.params
  const navigation = useNavigation()
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showTransmissionDropdown, setShowTransmissionDropdown] = useState(false)
  const [showBagsDropdown, setShowBagsDropdown] = useState(false)
  const [showPassengersDropdown, setShowPassengersDropdown] = useState(false)
  const [type, setType] = useState(car.type)
  const [transmission, setTransmission] = useState(car.transmission)
  const [bags, setBags] = useState(car.bags)
  const [passengers, setPassengers] = useState(car.passengers)
  const [name, setName] = useState(car.name)
  const [price, setPrice] = useState(car.price)

  const [bagList, setBagList] = useState(carBagsList)
  const [passengersList, setPassengersList] = useState(carPassengersList)
  const [transmissionList, setTransmissionList] = useState(carTransmissionList)
  const [typeList, setTypeList] = useState(carTypeList)

  const {success,loading,error} = useSelector(state=>state.editCar);

  useEffect(()=>{
    if(success){
      navigation.navigate('MyCars')
      dispatch({
        type:EDIT_CAR_RESET
      })
    }
  },[success,error])

  const checkChanges=()=>{
    return (name==car.name && bags==car.bags && type==car.type && transmission==car.transmission && passengers==car.passengers && price==car.price)
  }

  return (
    <View className='flex-1 bg-[#ffffff]'>
      <StatusBar backgroundColor="#00ccbb" barStyle="light-content" />
      <View className='bg-[#00ccbb] h-20'>
        <Text className='font-bold text-3xl text-[#ebf6f7] ml-3 text-center mt-5'>V-Rentings</Text>
      </View>
      <View className='bg-[#00ccbb] pl-2 flex-row items-center h-12'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='md-arrow-back' size={31} color='#ffffff' />
        </TouchableOpacity>
        <Text className='self-center font-bold ml-auto mr-auto text-2xl text-white'>{car?.name}</Text>
      </View>

      <View>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCj3ptenifFkfKjY-PaDEDcy9RWVrCar6Ww&usqp=CAU' }}
          className='h-40 w-full rounded-md ml-auto mr-auto -mt-1'
          resizeMode='contain'
        />
      </View>
      <View className='flex-row justify-around items-center'>
        <View>
          <Text className='text-lg font-bold text-gray-400 text-center'>{car.passengers} Passenger(s)</Text>
          <View className='ml-auto mr-auto'>
            <DropDownPicker
              style={{ width: 170 }}
              className={`border border-gray-400 mt-2 pl-5 text-xl text-gray-500 mb-3`}
              open={showPassengersDropdown}
              value={passengers}
              items={passengersList}
              setOpen={setShowPassengersDropdown}
              setValue={setPassengers}
              setItems={setPassengersList}
              onSelectItem={(item) => setPassengers(item.value)}
              placeholder={passengers}
              textStyle={{
                fontSize: 20,
                color: 'gray'
              }}
            />
          </View>
        </View>
        <View >
          <View>
            <Text className='text-lg font-bold text-gray-400 text-center'>{car.bags} Bag(s)</Text>
          </View>
          <View className='ml-auto mr-auto'>
            <DropDownPicker
              style={{ width: 170 }}
              className={`border border-gray-400 mt-2 pl-5 text-xl text-gray-500 mb-3`}
              open={showBagsDropdown}
              value={bags}
              items={bagList}
              setOpen={setShowBagsDropdown}
              setValue={setBags}
              setItems={setBagList}
              onSelectItem={(item) => setBags(item.value)}
              placeholder={bags}
              textStyle={{
                fontSize: 20,
                color: 'gray'
              }}
            />
          </View>
        </View>
      </View>

      <View className='ml-auto mr-auto'>
        <TextInput
          style={{ width: 370 }}
          className='border border-gray-400 mt-3 pl-5 text-xl text-gray-500 rounded-md mb-3'
          autoCapitalize='none'
          autoComplete='off'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          placeholder={name}
          onChangeText={(txt) => setName(txt)}
        />
        <TextInput
          style={{ width: 370 }}
          className='border border-gray-400 mt-2 w-96 rounded-md pl-5 text-xl text-gray-500 mb-3'
          autoCapitalize='none'
          autoComplete='off'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          placeholder={`$ ${price}`}
          onChangeText={(txt) => setPrice(txt)}
          keyboardType='numeric'
        />
      </View>

      <View className='flex-row justify-around items-center'>
        <View>
          <Text className='text-lg font-bold text-gray-400 text-center'>Type</Text>
          <View className='ml-auto mr-auto'>
            <DropDownPicker
              style={{ width: 170 }}
              className={`border border-gray-400 mt-2 pl-5 text-xl text-gray-500 mb-3 `}
              open={showTypeDropdown}
              value={type}
              items={typeList}
              setOpen={setShowTypeDropdown}
              setValue={setType}
              setItems={setTypeList}
              onSelectItem={(item) => setType(item.value)}
              placeholder={type}
              textStyle={{
                fontSize: 20,
                color: 'gray'
              }}
            />
          </View>
        </View>
        <View >
          <View>
            <Text className='text-lg font-bold text-gray-400 text-center'>Transmission</Text>
          </View>
          <View className='ml-auto mr-auto'>
            <DropDownPicker
              style={{ width: 170 }}
              className={`border border-gray-400 mt-2 pl-5 text-xl text-gray-500 mb-3 `}
              open={showTransmissionDropdown}
              value={transmission}
              items={transmissionList}
              setOpen={setShowTransmissionDropdown}
              setValue={setTransmission}
              setItems={setTransmissionList}
              onSelectItem={(item) => setTransmission(item.value)}
              placeholder={transmission}
              textStyle={{
                fontSize: 20,
                color: 'gray'
              }}
            />
          </View>
        </View>
      </View>
      <View className='ml-auto mr-auto'>
        <TouchableOpacity disabled={checkChanges()} className={`${checkChanges() ?'mt-7 bg-[#ffffff] border border-[#00ccbb] w-96 h-12 rounded-2xl text-center justify-center items-center' :'mt-7 bg-[#00ccbb] w-96 h-12 rounded-2xl text-center justify-center items-center'}`}>
          <Text className={`${checkChanges() ? 'text-[#00ccbb] font-bold text-xl' : 'text-white font-bold text-xl'} `}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity className='mt-3 bg-red-500 w-96 h-12 rounded-2xl text-center justify-center items-center' onPress={()=>{
          dispatch(editCar(car.id,{bags,type,passengers,transmission,name,price}))
        }}>
          <Text className='text-white font-bold text-xl'>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditCar