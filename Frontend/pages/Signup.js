import { View, Text, SafeAreaView,TextInput,TouchableOpacity,Image,StatusBar,ScrollView } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const SignUp = () => {
    return (
      <SafeAreaView className='bg-[#ffffff] flex-1'>
      <StatusBar backgroundColor="#69bfb8" barStyle="light-content" />
        <LinearGradient className='h-60 w-full' start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#00b5a5', '#05f7e3', '#00ccbb']} >
          <Text className='font-bold text-5xl text-[#ebf6f7] ml-3 text-center mt-auto mb-auto'>
            V-Rentings
          </Text>
        </LinearGradient>
  
        <View className='flex items-center justify-center -mt-6 bg-[#ffffff] rounded-t-3xl z-999'>
          <ScrollView className='mt-16 bg-[$ffffff]'>
            <View className='flex-row items-center'>
              <View className='absolute left-4'>
                <Fontisto name='person' size={26} color='#00ccbb' />
              </View>
              <TextInput
                className='border border-gray-400 w-80 rounded-3xl pl-14 text-xl text-gray-500'
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                placeholder='Name'
              />
            </View>
            <View className='flex-row items-center'>
              <View className='absolute left-4 bottom-3'>
                <MaterialCommunityIcons name='email' size={26} color='#00ccbb' />
              </View>
              <TextInput
                className='border border-gray-400 mt-7 w-80 rounded-3xl pl-14 text-xl text-gray-500'
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                secureTextEntry
                placeholder='Email'
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
                underlineColorAndroid='transparent'
                secureTextEntry
                placeholder='Password'
              />
            </View>
            <View className='flex-row items-center'>
              <View className='absolute left-4 bottom-3'>
                <Fontisto name='phone' size={22} color='#00ccbb' />
              </View>
              <TextInput
                className='border border-gray-400 mt-7 w-80 rounded-3xl pl-14 text-xl text-gray-500'
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                secureTextEntry
                placeholder='Phone'
              />
            </View>
            <View className='flex-row items-center'>
              <View className='absolute left-4 bottom-3'>
                <Fontisto name='map-marker-alt' size={26} color='#00ccbb' />
              </View>
              <TextInput
                className='border border-gray-400 mt-7 w-80 rounded-3xl pl-14 text-xl text-gray-500'
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                secureTextEntry
                placeholder='Address'
              />
            </View>
            <TouchableOpacity className='flex-row items-center justify-center space-x-2 mt-7 bg-[#00ccbb] w-80 h-12 rounded-3xl text-center justify-center items-center'>
              <Text className='text-white font-bold text-xl'>SignUp</Text>
            </TouchableOpacity>
          </ScrollView>

        </View>
      </SafeAreaView >
    )

}

export default SignUp
