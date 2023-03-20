import { View, Text, StyleSheet, TouchableOpacity,Dimensions } from 'react-native'
import React, { useState } from 'react'
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const Included = () => {
  const [expanded, setExpanded] = useState(true);
  const {width, height} = Dimensions.get('window')
  const handlePress = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <ScrollView className = 'flex-1 bg-white'>
        <List.Accordion
          title="Pick-up location: Meet & Greet"
          style={styles.list}
          titleStyle={{ color: 'black', fontSize: width*0.045, fontWeight: 'bold' }}
        >
          <List.Item
            title="A representative from the car hire supplier will meet you in the airport terminal and direct you to the service desk"
            titleStyle={{ color: 'gray', fontSize: width*0.042,marginLeft:'auto',marginRight:'auto' ,width:'88%'}}
            style={{ flex: 0.8 }}
            titleNumberOfLines={5}
          />
        </List.Accordion>

        <List.Accordion
          style={styles.list2}
          titleStyle={{ color: 'black', fontSize: width*0.045, fontWeight: 'bold' }}
          title="Fuel policy: Full to Full"
          >
          <List.Item title="This is the best value option, Pick your car u with a full tank of fuel. This return the car with a full tank."
            titleStyle={{ color: 'gray', fontSize: width*0.042,marginLeft:'auto',marginRight:'auto',width:'88%' }}
            style={{ flex: 0.8 }}
            titleNumberOfLines={5}
          />
        </List.Accordion>

        <List.Accordion
          style={styles.list2}
          titleStyle={{ color: 'black', fontSize: width*0.045, fontWeight: 'bold' }}
          title="Mileage: Unlimited"
          >
          <List.Item title="There is no limit to the distance you can drive with this car."
            titleStyle={{ color: 'gray', fontSize: width*0.04,marginLeft:'auto',marginRight:'auto',width:'88%' }}
            style={{ flex: 0.8 }}
            titleNumberOfLines={5}
          />
        </List.Accordion>
      </ScrollView>
    </>
  )
}



const styles = StyleSheet.create({
  list: {
    width: '90%',
    backgroundColor: '#00000020',
    color: 'white',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'5%',  },
  list2: {
    width: '90%',
    backgroundColor: '#00000020',
    color: 'white',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'1%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});


export default Included