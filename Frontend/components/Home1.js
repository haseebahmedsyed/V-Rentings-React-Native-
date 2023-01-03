import React, { useState ,useEffect} from "react";
import { SafeAreaView, StyleSheet, View, Text,TouchableOpacity,Image, PermissionsAndroid } from "react-native";
import DateRangePicker from "rn-select-date-range";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import Geolocation from 'react-native-geolocation-service';


const Home1 = () => {
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


  const navigation = useNavigation();
    const [selectedRange, setRange] = useState({});
  return (
    <SafeAreaView className='flex-1 bg-[#ffffff]'>
    <Header/>
      <View style={styles.container}>
      <Text className='text-2xl text-center mb-7 font-bold text-gray-400'>Select the Dates</Text>
        <DateRangePicker
          onSelectDateRange={(range) => {
            setRange(range);
          }}
          blockSingleDateSelection={true}
          responseFormat="YYYY-MM-DD"
          selectedDateContainerStyle={styles.selectedDateContainerStyle}
          selectedDateStyle={styles.selectedDateStyle}
          clearBtnTitle=<Text className='text-red-600 font-bold text-lg'>Clear</Text>
          confirmBtnTitle=<Text className='text-green-600 font-bold text-lg'>Confirm</Text>
        />
      </View>
        <TouchableOpacity onPress={()=>navigation.navigate("Home2",{
          latitude,
          longitude
        })} className='flex mt-5 bg-[#00ccbb] w-72 h-12 rounded-lg text-center justify-center items-center ml-auto mr-auto'>
          <Text className='text-white font-bold text-xl'>Continue</Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      margin: 20,
      marginTop:60
    },
    selectedDateContainerStyle: {
      height: 35,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "blue",
    },
    selectedDateStyle: {
      fontWeight: "bold",
      color: "white",
    },
  });

export default Home1