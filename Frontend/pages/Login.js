import { ActivityIndicator, View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, PermissionsAndroid, StatusBar, StyleSheet, Modal,useWindowDimensions, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { checkEmail, login } from '../redux/actions/accountActions';
import { useDispatch, useSelector } from 'react-redux'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Loader from '../components/Loader';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import {ERROR_RESET} from '../redux/constants/accountConstants'

const calculateFont=(num)=>{
  let width = Dimensions.get('window').width
  let height = Dimensions.get('window').height
  let cal = height/num;
  return height/cal;
}

const getWidth=()=>{
  return Dimensions.get('window').width
}
const getHeight=()=>{
  return Dimensions.get('window').height
}
const getScale=()=>{
  return Dimensions.get('window').scale
}

const Login = () => {
  // const {width,height, scale, fontScale} = useWindowDimensions()
  const dispatch = useDispatch();
  const { success, error, loading, user } = useSelector(state => state.loginReducer)
  const { found, error: foundError, loading: foundLoading } = useSelector(state => state.isUserExist)
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    email: 'syedhaseebahmed380@gmail.com',
    password: ''
  })
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  })
  const onChangeText = (text, name) => {
    setCredentials({ ...credentials, [name]: text })
  }

  const handleLogin = () => {
    dispatch(login(credentials.email, credentials.password))
  }

  useEffect(() => {
    if (success) {
      navigation.navigate("Home")
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      })
    }
    if(error){
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Login Failed',
        textBody: `${error}`
      })
      dispatch({
        type: ERROR_RESET
      })
    }
  }, [success,error])

  // useEffect(()=>{
  //   if(!found){
  //     navigation.navigate('SignUp',{name:userInfo.name,email:userInfo.email})
  //   }
  // },[found])

  useEffect(() => {
    GoogleSignin.configure()
  }, [])

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // await GoogleSignin.signOut();
      // await GoogleSignin.clearCachedAccessToken();
      // await GoogleSignin.disconnect();
      const userInfo = await GoogleSignin.signIn({ forceCodeForRefreshToken: true });
      setUserInfo({ name: userInfo.name, email: userInfo.email })
      dispatch(checkEmail(userInfo.user.email));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error)
      } else {
        // some other error happened
        console.log(error)
      }
    }
  };

  return (
    <SafeAreaView className='bg-[#ffffff] flex-1'>
      <StatusBar backgroundColor="#69bfb8" barStyle="light-content" />
      <Loader loading={loading}/>
      <LinearGradient className='h-60 w-full' start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#00b5a5', '#05f7e3', '#00ccbb']} >
        <Text style={styles.mainHeading} className='font-bold text-[#ebf6f7] text-center'>
          V-Rentings
        </Text>
      </LinearGradient>

      <View style={styles.whiteView} 
      // className='flex items-center justify-center -mt-6 bg-[#ffffff] rounded-t-3xl z-999'
      >
        <View className=' mt-20'>
          <View className='flex-row items-center'>
            <View className='absolute left-5 bottom-3'>
              <MaterialCommunityIcons name='email' size={26} color='#00ccbb' />
            </View>
            <TextInput
              style={styles.textInput}
              className='border border-gray-400 text-gray-500 pr-5'
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholder='Email'
              onChangeText={(txt) => onChangeText(txt, "email")}
              value={credentials.email}
            />
          </View>
          <View className='flex-row items-center'>
            <View className='absolute left-5 bottom-3.5'>
              <MaterialCommunityIcons name='lock' size={26} color='#00ccbb' />
            </View>
            <TextInput
            style={styles.textInput}
              className='border border-gray-400 text-gray-500'
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              underlineColorAndroid="transparent"
              secureTextEntry
              placeholder='Password'
              onChangeText={(txt) => onChangeText(txt, "password")}
              value={credentials.password}
            />
          </View>
          <TouchableOpacity style={styles.login}  disabled={credentials.email == '' || credentials.password == ''} onPress={handleLogin}>
            <Text 
            style={styles.loginText}
            >Login</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center justify-center mt-5 h-10'>
          <Text className='text-lg font-bold text-gray-500'>Don't have any account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}><Text className='font-bold text-lg text-[#00ccbb]'>Register</Text></TouchableOpacity>
        </View>
      <TouchableOpacity style={styles.googleBtn} onPress={signIn}
      className='border rounded-lg border-gray-400 shadow-2xl'
      >
        <View>
          <Image
            source={require('../components/google.png')}
            className='h-6 w-6 rounded-md'
          />
        </View>
        <Text className='text-xl font-bold text-gray-600'>Contine with Google</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  textInput:{
    width:getWidth()/1.19,
    marginTop:'5%',
    borderRadius: 50/getScale(),
    paddingLeft:85/getScale(),
    fontSize: calculateFont(20),
    marginLeft:'auto',
    marginRight:'auto',
    height:'68%'
   },
   mainHeading:{
    fontSize: calculateFont(45),
    marginTop:'auto',
    marginBottom:'auto', 
   },
   login:{
    backgroundColor:'#00ccbb',
    height:getHeight()/15,
    width:getWidth()/1.19,
    borderRadius: 50/getScale(),
    marginTop: '5%',
    marginLeft:'auto',
    marginRight:'auto',
   },
   loginText:{
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    fontSize: calculateFont(22),
    marginTop:'auto',
    marginBottom:'auto'
   },
   whiteView:{
    width:getWidth(),
    backgroundColor:'white',
    marginTop:'-10%',
    borderRadius:50/getScale(),
    flex:1
   },
   googleBtn:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:getWidth()/1.19,
    backgroundColor:'white',
    marginLeft:'auto',
    marginRight:'auto',
    height:getHeight()/15,
    alignItems:'center',
    marginTop:'7%'
   }
})


export default Login
