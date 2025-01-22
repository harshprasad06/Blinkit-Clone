import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from './CustomText';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ArrpwButtonProps {
  title: string;
  onPress?: () => void;
  price?: number;
  loading?: boolean;
}

const ArrowButton: FC<ArrpwButtonProps> = ({
  title,
  onPress,
  price,
  loading,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={loading}
      onPress={onPress}
      style={[
        styles.btn,
        {justifyContent: price != 0 ? 'space-between' : 'center'},
      ]}>
     {
        price != 0 && price && (
            <View>
                <CustomText variant="h7" style={{color:'#fff'}} fontFamily={Fonts.Medium}>₹{price+34}</CustomText>
                <CustomText variant="h9" style={{color:'#fff'}} fontFamily={Fonts.Medium}>TOTAL</CustomText>

            </View>
        )
     }

     <View style={styles.flexRow}>
        <CustomText  variant='h6' style={{color:'#fff'}} fontFamily={Fonts.Medium}>
            {title}
        </CustomText>
        {
            loading ? (<ActivityIndicator color="white" size="small" style={{marginHorizontal:5}} />) : (<Icon name="arrow-right" size={RFValue(25)} color="#fff"/>)
        }
     </View>
    </TouchableOpacity>
  );
};

export default ArrowButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.secondary,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
