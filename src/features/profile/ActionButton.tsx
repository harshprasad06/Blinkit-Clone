import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';

const ActionButton :FC<{icon: string; label: string; onPress?: () => void}> = ({icon,label,onPress}) => {
  return (
   <TouchableOpacity onPress={onPress} style={styles.btn}>
    <View style={styles.iconContainer}>
        <Icon name={icon} size={RFValue(14)} color={Colors.text}/>
    </View>
    <CustomText variant='h7' fontFamily={Fonts.Medium}>
        {label}
    </CustomText>
    </TouchableOpacity>
  )
}

export default ActionButton

const styles = StyleSheet.create({
    btn :{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        marginVertical:10
    },
    iconContainer:{
        justifyContent:'center',
        alignItems:"center",
        padding:8,
        backgroundColor:Colors.backgroundSecondary,
        borderRadius:100

    }
})