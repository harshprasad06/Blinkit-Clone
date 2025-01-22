import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {screenWidth} from '@utils/Scaling';
import {Colors, Fonts} from '@utils/Constants';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import {useAuthStore} from '@state/authStore';
import {navigate} from '@utils/NavigationUtils';

const OrderSuccess: FC = () => {
  const {user} = useAuthStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('LiveTracking');
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/animations/confirm.json')}
        autoPlay
        loop={false}
        duration={2000}
        speed={1}
        style={styles.lottieView}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
      />
      <CustomText
        variant="h8"
        fontFamily={Fonts.SemiBold}
        style={styles.orderPlaceText}>
        ORDER PLACED
      </CustomText>
      <View style={styles.deliveryContainer}>
        <CustomText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={styles.deliveryText}>
          Delivering to Home
        </CustomText>
      </View>
      <CustomText
        variant="h8"
        style={styles.addressText}
        fontFamily={Fonts.Medium}>
        {user?.address || 'Somewhere , Knowhere'}
      </CustomText>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlaceText: {
    opacity: 0.4,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    padding: 4,
    marginBottom: 5,
    borderColor: Colors.secondary,
  },
  deliveryText: {
    borderColor: Colors.secondary,
    marginTop: 15,
  },
  addressText: {
    opacity: 0.8,
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
  },
});
