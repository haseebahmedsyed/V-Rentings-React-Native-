import { View, Text, Modal, StyleSheet } from 'react-native'
import React from 'react'
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

const Loader = ({loading}) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={loading}
  >
    <View style={styles.centeredView}>
        <BallIndicator color='#00ccbb' />
    </View>
  </Modal>
  )
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000099'
    },
  });

export default Loader