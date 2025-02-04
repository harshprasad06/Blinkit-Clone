import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import  Icon  from 'react-native-vector-icons/Ionicons';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

const WalletItem:FC<{icon:string; label:string}> = ({label,icon}) => {
  return (
    <View style={styles.walletItemContainer}> 
     <Icon name={icon} size={RFValue(20)} color={Colors.text}/>
     <CustomText variant='h8' fontFamily={Fonts.Medium}>
        {label}
     </CustomText>
    </View>
  )
}

export default WalletItem

const styles = StyleSheet.create({
    walletItemContainer :{
        alignItems:'center'
    }
})