import { View, Text, SafeAreaView,TextInput,TouchableOpacity,Image } from 'react-native'
import React from 'react'
// import { useNavigation } from '@react-navigation/native'

const SignUp = () => {
    // const navigation = useNavigation();
    return (
        <SafeAreaView className='pt-5'>
        <View className='flex items-center justify-center'>
          <Text className='text-3xl font-bold text-gray-400'>The Healing Clinic.</Text>
        </View>
        <View className='flex items-center mt-4 mb-5'>
        <Image
        source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxQlNZB20j1_nc9zPBJZz2giyuORe3Kb2vWg&usqp=CAU"}}
        className='h-44 w-44 bg-red-300 rounded-full'
        />
      </View>
        <View className='flex items-center justify-center mt-3'>
            <TextInput
              className='border border-gray-400 w-72 rounded-lg pl-3 text-xl text-gray-500'
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholder='Name'
            />
            <TextInput
              className='border border-gray-400 mt-5 w-72 rounded-lg pl-3 text-xl text-gray-500'
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholder='Phone'
            />
            <TextInput
              className='border border-gray-400 mt-5 w-72 rounded-lg pl-3 text-xl text-gray-500'
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
              placeholder='Password'
            />
            <TouchableOpacity className='mt-5 bg-[#00ccbb] w-72 h-12 rounded-lg text-center justify-center items-center'>
              <Text className='text-white font-bold text-xl'>SignUp</Text>
            </TouchableOpacity>
        </View>
  
      </SafeAreaView>
    )

}

export default SignUp
