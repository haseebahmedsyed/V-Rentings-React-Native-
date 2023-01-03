import { View, Text, SafeAreaView,TextInput,TouchableOpacity,Image, PermissionsAndroid } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';


const Login = () => {
  const navigation = useNavigation();
  // const [latitude, setLatitude] = useState(37.78825);
  // const [longitude, setLongitude] = useState(-122.4324);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLatitude(parseFloat(position.coords.latitude))
            setLongitude(parseFloat(position.coords.longitude))

          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  useEffect(() => {
    requestCameraPermission()
  }, [])

  return (
    <SafeAreaView className='pt-5'>
      <View className='flex items-center justify-center'>
        <Text className='text-3xl font-bold text-gray-400'>The Healing Clinic.</Text>
      </View>
      <View className='flex items-center mt-4 mb-5'>
        <Image
        source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxQlNZB20j1_nc9zPBJZz2giyuORe3Kb2vWg&usqp=CAU"}}
        className='h-60 w-60 bg-red-300 rounded-full'
        />
      </View>
      <View className='flex items-center justify-center mt-3'>
          <TextInput
            className='border border-gray-400 w-72 rounded-lg pl-3 text-xl text-gray-500'
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholder='Email'
          />
          <TextInput
            className='border border-gray-400 mt-5 w-72 rounded-lg pl-3 text-xl text-gray-500'
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            secureTextEntry
            placeholder='Password'
          />
          <TouchableOpacity onPress={()=>navigation.navigate("Home1",{
            latitude:latitude,
            longitude:longitude
          })} className='mt-5 bg-[#00ccbb] w-72 h-12 rounded-lg text-center justify-center items-center'>
            <Text className='text-white font-bold text-xl'>Login</Text>
          </TouchableOpacity>
      </View>

      <View className='flex-row items-center justify-center mt-5 h-10'>
        <Text className='text-lg'>Don't have any account ? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}><Text className='text-lg text-[#00ccbb]'>Register</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login