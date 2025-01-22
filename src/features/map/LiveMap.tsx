import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenHeight } from '@utils/Scaling'
import { Colors } from '@utils/Constants'

const LiveMap = () => {
  return (
    <View style={styles.container}>
      <Text>LiveMap</Text>
    </View>
  )
}

export default LiveMap

const styles = StyleSheet.create({
    container :{
        height:screenHeight*0.35,
        width:'100%',
        borderRadius:15,
        backgroundColor:'#fff',
        overflow:'hidden',
        borderWidth:1,
        borderColor:Colors.border,
        position:"relative"
    }
})