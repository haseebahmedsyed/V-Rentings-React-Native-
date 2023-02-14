import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, PermissionsAndroid,StatusBar } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { login } from '../redux/actions/accountActions';
import {useDispatch,useSelector} from 'react-redux'

const Login = () => {
  const dispatch = useDispatch();
  const {success,error,loading,user} = useSelector(state=>state.loginReducer)
  const navigation = useNavigation();
  const [credentials,setCredentials] = useState({
    email:'',
    password:''
  })
  const onChangeText=(text,name)=>{
    setCredentials({...credentials,[name]:text})
  }

  const handleLogin=()=>{
    dispatch(login(credentials.email,credentials.password))
  }

  useEffect(()=>{
    console.log(success)
    if(success){
      navigation.navigate("Home")
    }
  },[success])

  return (
    <SafeAreaView className='bg-[#ffffff] flex-1'>
    <StatusBar backgroundColor="#69bfb8" barStyle="light-content" />
      <LinearGradient className='h-60 w-full' start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#00b5a5', '#05f7e3', '#00ccbb']} >
        <Text className='font-bold text-5xl text-[#ebf6f7] ml-3 text-center mt-auto mb-auto'>
          V-Rentings
        </Text>
      </LinearGradient>

      <View className='flex items-center justify-center -mt-6 bg-[#ffffff] rounded-t-3xl z-999'>
        <View className=' mt-20'>
          <View className='flex-row items-center'>
            <View className='absolute left-4'>
              <MaterialCommunityIcons name='email' size={26} color='#00ccbb' />
            </View>
            <TextInput
              className='border border-gray-400 w-80 rounded-3xl pl-14 text-xl text-gray-500 pr-5'
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholder='Email'
              onChangeText={(txt)=>onChangeText(txt,"email")}
            />
          </View>
          <View className='flex-row items-center'>
            <View className='absolute left-4 bottom-3'>
              <MaterialCommunityIcons name='lock' size={26} color='#00ccbb' />
            </View>
            <TextInput
              className='border border-gray-400 mt-7 w-80 rounded-3xl pl-14 text-xl text-gray-500'
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              underlineColorAndroid="transparent"
              secureTextEntry
              placeholder='Password'
              onChangeText={(txt)=>onChangeText(txt,"password")}
            />
          </View>
          <TouchableOpacity disabled={credentials.email=='' || credentials.password==''} onPress={handleLogin} className='mt-7 bg-[#00ccbb] w-80 h-12 rounded-3xl text-center justify-center items-center'>
            <Text className='text-white font-bold text-xl'>Login</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center justify-center mt-5 h-10'>
          <Text className='text-lg font-bold text-gray-500'>Don't have any account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}><Text className='font-bold text-lg text-[#00ccbb]'>Register</Text></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity className='ml-auto mr-auto flex-row space-x-3 border h-14 w-72 rounded-lg justify-center items-center mt-5 border-gray-400 bg-[#ffffff] shadow-2xl'>
        <View>
          <Image
            source={require('../components/google.png')}
            className='h-6 w-6 rounded-md'
          />
        </View>
        <Text className='text-xl font-bold text-gray-600'>Contine with Google</Text>
      </TouchableOpacity>
    </SafeAreaView >
  )
}

export default Login