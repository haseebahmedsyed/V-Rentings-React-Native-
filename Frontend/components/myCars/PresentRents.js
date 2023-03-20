import { View, Text, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import RentModal from './RentModal'


const PresentRents = ({ route }) => {
  const { rents } = route.params
  console.log(rents)
  const filteration = (value, index, array) => {
    return Number(value.endDate) > new Date(Date.now()).getTime()
  }

  return (

    <View className='bg-[#ffffff] flex-1'>
      {
        (rents.length > 0) && rents.filter(filteration).map((rent, index) => {
          return <View key={rent.id}>
            <RentModal rent={rent} index={index} />
          </View>
        })
      }
    </View>
  )
}

export default PresentRents