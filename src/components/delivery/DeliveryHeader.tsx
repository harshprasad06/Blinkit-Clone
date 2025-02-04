import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useAuthStore} from '@state/authStore';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';

const DeliveryHeader: FC<{name: string; email: string}> = ({name, email}) => {
  const {logout} = useAuthStore();
  return (
    <View style={styles.flexRow}>
    <View style={styles.imgContainer}>
        <Image source={require('@assets/images/delivery_boy.png')} style={styles.img} />
    </View>
    <View style={styles.infoContainer}>
        <CustomText variant='h4' fontFamily={Fonts.Medium}>
            Hello {name}!
        </CustomText>
    </View>
    </View>
  );
};

export default DeliveryHeader;

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  imgContainer: {
    padding: 4,
    borderRadius: 100,
    height: 60,
    width: 60,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundSecondary,
  },
  img: {
    width: '100%',
    height: '100%',
    bottom:-8,
    resizeMode: 'contain',
  },
  infoContainer:{
    width:'70%'
  }
});
