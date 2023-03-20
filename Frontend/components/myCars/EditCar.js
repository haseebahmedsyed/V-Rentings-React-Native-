import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { carBagsList, carPassengersList, carTransmissionList, carTypeList } from './DataLists'
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { editCar, deleteCar, uploadCarImage } from '../../redux/actions/carsAction';
import { getMe } from '../../redux/actions/accountActions';
import { EDIT_CAR_RESET, DELETE_CAR_RESET } from '../../redux/constants/carConstants';
import { launchImageLibrary } from 'react-native-image-picker';
import { SliderBox } from "react-native-image-slider-box";
import Loader from '../Loader'
import { GET_ME_RESET } from '../../redux/constants/accountConstants'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { ERROR_RESET } from '../../redux/constants/accountConstants'



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

  const { success, loading, error } = useSelector(state => state.editCar);
  const { success: deleteSuccess, loading: deleteLoading, error: deleteError } = useSelector(state => state.deleteCar);
  const { success: uploadSuccess, loading: uploadLoading, error: uploadError } = useSelector(state => state.uploadCarImageReducer);
  const { isGet } = useSelector(state => state.loginReducer);
  const [images, setImages] = useState(car?.images ? car?.images : [])
  const { width, height } = Dimensions.get('window')

  useEffect(() => {
    if (isGet) {
      let carImg = []
      for (let x of car.images) {
        carImg.push(x.url)
      }
      dispatch({
        type: GET_ME_RESET
      })
      setImages(carImg)
    }
  }, [isGet, images])

  useEffect(() => {
    if (uploadSuccess) {
      dispatch(getMe())
    }
    if (success) {
      dispatch(getMe())
      navigation.navigate('MyCars')
      dispatch({
        type: EDIT_CAR_RESET
      })
    }
    if (deleteSuccess) {
      dispatch(getMe())
      navigation.navigate('MyCars')
      dispatch({
        type: DELETE_CAR_RESET
      })
    }

    if (uploadError || error || deleteError) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error Message',
        textBody: `${error ? error : uploadError ? uploadError : deleteError}`
      })
      dispatch({
        type: ERROR_RESET
      })
    }
  }, [uploadSuccess, uploadError, success, error, deleteSuccess, deleteError])

  const handleUploadImage = (assets) => {
    let newArr = []
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < assets.length; i++) {
        let newFile = {
          uri: assets[i].uri,
          type: assets[i].type,
          name: `image.${assets[i].uri.split(".")[1]}`
        }
        const data = new FormData()
        data.append('file', newFile)
        data.append('upload_preset', 'RentingApp')
        data.append('cloud_name', 'duwpzcvdw')

        let res = await fetch("https://api.cloudinary.com/v1_1/duwpzcvdw/image/upload", {
          method: "post",
          body: data
        })
        let res2 = await res.json();
        newArr.push({ public_id: res2.public_id, url: res2.secure_url })
      }
      resolve(newArr)

    })
  }

  imageGalleryLaunch = () => {
    setImages([])
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      selectionLimit: 5,
    };
    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        console.log(res.assets.length)
        handleUploadImage(res.assets).then((val) => {
          dispatch(uploadCarImage({ images: val }, car.id))
        })
      }
    });
  }



  const checkChanges = () => {
    return (name == car.name && bags == car.bags && type == car.type && transmission == car.transmission && passengers == car.passengers && price == car.price)
  }

  return (
    <View className='flex-1 bg-[#ffffff]'>
      <StatusBar backgroundColor="#00ccbb" barStyle="light-content" />
      <Loader loading={uploadLoading || loading || deleteLoading} />
      {/* <View className='bg-[#00ccbb] h-20'>
        <Text className='font-bold text-3xl text-[#ebf6f7] ml-3 text-center mt-5'>V-Rentings</Text>
      </View> */}
      <View className='bg-[#00ccbb] pl-2 flex-row items-center h-12'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='md-arrow-back' size={26} color='#ffffff' />
        </TouchableOpacity>
        <Text style={{ fontSize: width * 0.06 }} className='ml-auto mr-auto text-white font-bold'>{car?.name}</Text>
      </View>
      {
        images.length > 0 ?
          <View className='mt-0.5'>
            <SliderBox
            style={{ height: height / 4, width: width }}
              images={images}
              sliderBoxHeight={200}
              onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
              dotColor="#00ccbb"
              inactiveDotColor="#90A4AE"
            />
          </View> :
          <View>
            <TouchableOpacity className='self-end mr-2 mt-1.5 w-32 h-8' onPress={imageGalleryLaunch}>
              <Text style={{ fontSize: width * 0.044 }} className='text-[#00ccbb] text-center'>Upload Photo</Text>
            </TouchableOpacity>
            <Image
              style={{ height: height / 5, width: width }}
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCj3ptenifFkfKjY-PaDEDcy9RWVrCar6Ww&usqp=CAU' }}
              className='h-40 w-full rounded-md ml-auto mr-auto -mt-1'
              resizeMode='contain'
            />
          </View>
      }
      <ScrollView className='mb-1'>
        <View className='flex-row justify-around items-center'>
          <View>
            <Text style={{ fontSize: width * 0.045 }} className='text-gray-400 text-center'>{car.passengers} Passenger(s)</Text>
            <View className='ml-auto mr-auto'>
              <DropDownPicker
                style={{ width: width / 2.5 }}
                className={`border border-gray-400 text-gray-500`}
                open={showPassengersDropdown}
                value={passengers}
                items={passengersList}
                setOpen={setShowPassengersDropdown}
                setValue={setPassengers}
                setItems={setPassengersList}
                onSelectItem={(item) => setPassengers(item.value)}
                placeholder={passengers}
                disabled={car?.rents?.length > 0}
                textStyle={{
                  fontSize: width * 0.05,
                  color: 'gray'
                }}
              />
            </View>
          </View>
          <View >
            <View>
              <Text style={{ fontSize: width * 0.045 }} className='text-gray-400 text-center'>{car.bags} Bag(s)</Text>
            </View>
            <View className='ml-auto mr-auto'>
              <DropDownPicker
                style={{ width: width / 2.5 }}
                className={`border border-gray-400 text-gray-500`}
                open={showBagsDropdown}
                value={bags}
                items={bagList}
                setOpen={setShowBagsDropdown}
                setValue={setBags}
                setItems={setBagList}
                onSelectItem={(item) => setBags(item.value)}
                placeholder={bags}
                disabled={car?.rents?.length > 0}
                textStyle={{
                  fontSize: width * 0.05,
                  color: 'gray'
                }}
              />
            </View>
          </View>
        </View>

        <View className='flex-column items-center'>
        <View>
        <Text style={{ fontSize: width * 0.045, marginTop: '2%' }} className='text-gray-400 pl-3'>Name</Text>
          <TextInput
            style={{ width: width / 1.126, marginTop: '4%', fontSize: width * 0.048,marginTop:'0.5%' }}
            className='border border-gray-400 text-gray-500 rounded-md pl-3'
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            value={name}
            onChangeText={(txt) => setName(txt)}
            disabled={car?.rents?.length > 0}
          />
          </View>
          <View>
            <Text style={{ fontSize: width * 0.045, marginTop: '2%' }} className='text-gray-400 pl-3'>Price</Text>
            <TextInput
              style={{ width: width / 1.126, fontSize: width * 0.048,marginTop:'0.5%' }}
              className='border border-gray-400 rounded-md text-gray-500 pl-3'
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              value={`${price}`}
              onChangeText={(txt) => setPrice(txt)}
              keyboardType='numeric'
              disabled={car?.rents?.length > 0}
              editable={!car?.rents?.length > 0}
              selectTextOnFocus={!car?.rents?.length > 0}
            />
          </View>
        </View>

        <View className='flex-row justify-around items-center mt-2'>
          <View>
            <Text style={{ fontSize: width * 0.045 }} className='text-gray-400 text-center'>Type</Text>
            <View className='ml-auto mr-auto'>
              <DropDownPicker
                style={{ width: width / 2.5 }}
                className={`border border-gray-400 mt-2 pl-5 text-xl text-gray-500 mb-3 `}
                open={showTypeDropdown}
                value={type}
                items={typeList}
                setOpen={setShowTypeDropdown}
                setValue={setType}
                setItems={setTypeList}
                onSelectItem={(item) => setType(item.value)}
                placeholder={type}
                disabled={car?.rents?.length > 0}
                textStyle={{
                  fontSize: 20,
                  color: 'gray'
                }}
              />
            </View>
          </View>
          <View >
            <View>
              <Text style={{ fontSize: width * 0.045 }} className='text-gray-400 text-center'>Transmission</Text>
            </View>
            <View className='ml-auto mr-auto'>
              <DropDownPicker
                style={{ width: width / 2.5 }}
                className={`border border-gray-400 mt-2 pl-5 text-xl text-gray-500 mb-3 `}
                open={showTransmissionDropdown}
                value={transmission}
                items={transmissionList}
                setOpen={setShowTransmissionDropdown}
                setValue={setTransmission}
                setItems={setTransmissionList}
                onSelectItem={(item) => setTransmission(item.value)}
                placeholder={transmission}
                disabled={car?.rents?.length > 0}
                textStyle={{
                  fontSize: 20,
                  color: 'gray'
                }}
              />
            </View>
          </View>
        </View>
        <View className='flex-column items-center justify-center mt-5'>
          {
            car?.rents?.length > 0 ? <Text style={{fontSize:width*0.045}} className='text-center text-red-500 '>As far as car is booked, you can't edit it.</Text> :
              <>
                <TouchableOpacity
                  style={{ width: width / 1.1, height: height / 16 }}
                  onPress={() => {
                    dispatch(editCar(car.id, { bags, type, passengers, transmission, name, price }))
                  }} disabled={checkChanges()} className={`${checkChanges() ? 'bg-[#ffffff] border border-[#00ccbb] rounded-2xl' : 'bg-[#00ccbb] rounded-2xl'}`}>
                  <Text style={{
                    fontSize: width * 0.05,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 'auto',
                    marginTop: 'auto',
                  }} className={`${checkChanges() ? 'text-[#00ccbb]' : 'text-white'} `}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ width: width / 1.1, height: height / 16 }}
                  onPress={() => {
                    dispatch(deleteCar(car.id))
                  }} className='mt-3 bg-red-500 w-96 h-12 rounded-2xl text-center justify-center items-center'>
                  <Text
                    style={{
                      fontSize: width * 0.05,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginBottom: 'auto',
                      marginTop: 'auto',
                    }}
                    className='text-white'>Delete</Text>
                </TouchableOpacity>
              </>
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default EditCar