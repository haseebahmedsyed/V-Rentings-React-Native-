import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import RentModal from '../myCars/RentModal'

const MyCurrentRents = () => {
    const {rents} = useSelector(state=>state.loginReducer);
    console.log(rents)
    const filteration = (value, index, array) => {
        return Number(value.endDate) > new Date(Date.now()).getTime()
      }
  return (
    <View className='bg-[#ffffff] flex-1'>
      {
        (rents.length > 0) && rents.filter(filteration).map((rent, index) => {
          return <View key={rent.id} className='w-full'>
            <RentModal rent={rent} index={index} myRent={true}/>
          </View>
        })
      }
    </View>
  )
}

export default MyCurrentRents