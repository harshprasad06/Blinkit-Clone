import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import Logo from '@assets/images/splash_logo.jpeg';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {jwtDecode} from 'jwt-decode';
import {refetchUser, refresh_tokens} from '@service/authService';

// Configure only for iOS
if (Platform.OS === 'ios') {
  GeoLocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
    enableBackgroundLocationUpdates: false,
  });
}
interface DecodedToken {
  exp: number;
}

const SplashScreen = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session Expired', 'Please log in again.');
        return false;
      }
      if (decodedAccessToken.exp < currentTime) {
        try {
          refresh_tokens();
          await refetchUser(setUser);
        } catch (error) {
          console.log(error);
          Alert.alert('Error', 'There was an error refreshing tokens');
          return false;
        }
      }

      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }
      return true;
    }
    resetAndNavigate('CustomerLogin');
    return false;
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        if (Platform.OS === 'android') {
          // First check the permission status
          const checkPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (!checkPermission) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Permission',
                message:
                  'We need your location to provide better shopping experience',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );

            console.log('Permission status:', granted);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Location permission granted');
            } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
              // Handle "Never ask again" case
              Alert.alert(
                'Location Permission Required',
                'Please enable location permission from settings to get better shopping experience',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Open Settings',
                    onPress: () => Linking.openSettings(),
                  },
                ],
              );
            } else {
              Alert.alert(
                'Location Permission Required',
                'Sorry we need location service to give you better shopping experience',
              );
            }
          }
          tokenCheck();
        } else {
          GeoLocation.requestAuthorization();
          tokenCheck();
        }
      } catch (error) {
        console.log('error', error);
        Alert.alert(
          'Sorry we need location service to give you better shopping experience',
        );
      }
    };
    const timeoutId = setTimeout(fetchUserLocation, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});
