import React, { useState ,useEffect} from "react";
import { SafeAreaView, StyleSheet, View, Text,TouchableOpacity,Image, PermissionsAndroid,StatusBar, Dimensions } from "react-native";
import DateRangePicker from "rn-select-date-range";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from "react-redux";

const Home1 = () => {
  const dispatch = useDispatch()
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const {height, width} = Dimensions.get('window')

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
            dispatch({
              type:'INIT_LOCATION',
              payload:{latitude:parseFloat(position.coords.latitude),longitude:parseFloat(position.coords.longitude)}
            })
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


  const navigation = useNavigation();
    const [selectedRange, setRange] = useState({});
  return (
    <SafeAreaView className='flex-1 bg-[#ffffff]'>
    <StatusBar backgroundColor="#00ccbb" barStyle="light-content" />
    <Header/>
      <View style={styles.container}>
      <Text className='font-bold text-gray-400'
      style={{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:width * 0.075,
        marginBottom:'7%'
      }}
      >Select the Dates</Text>
        <DateRangePicker
          onSelectDateRange={(range) => {
            setRange(range);
            console.log(Date.parse(range.firstDate))
            dispatch({
              type:'INIT_DATE',
              payload:{
                startDate:Date.parse(range.firstDate),
                endDate:Date.parse(range.secondDate)
              }
            })
          }}
          blockSingleDateSelection={true}
          responseFormat="YYYY-MM-DD"
          selectedDateContainerStyle={styles.selectedDateContainerStyle}
          selectedDateStyle={styles.selectedDateStyle}
          clearBtnTitle=<Text style={{
            fontSize:width*0.042
          }} className='text-red-600 font-bold'>Clear</Text>
        />
      </View>
        <TouchableOpacity style={{
          width:'75%',
          height:'6%'
        }} disabled={latitude==0 || longitude==0 || selectedRange=={}} onPress={()=>navigation.navigate("Home2")} className='flex mt-5 bg-[#00ccbb] w-80 h-12 rounded-3xl text-center justify-center items-center ml-auto mr-auto'>
          <Text
          style={{
            fontWeight:'bold',
            fontSize:width*0.055,
            marginTop:'auto',
            marginBottom:'auto'
          }}
           className='text-white font-bold text-xl'>Continue</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      margin: '7%',
      marginTop:'13%'
    },
    selectedDateContainerStyle: {
      height: 35,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#00ccbb",
    },
    selectedDateStyle: {
      fontWeight: "bold",
      color: "white",
    },
  });

export default Home1