import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useAuthStore} from '@state/authStore';
import {useNavigationState} from '@react-navigation/native';
import {getOrderById} from '@service/orderService';
import {hocStyles} from '@styles/GlobalStyles';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import {navigate} from '@utils/NavigationUtils';
import {io} from 'socket.io-client';
import {SOCKET_URL} from '@service/config';

const withLiveStatus = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithLiveStatusComponent: FC<P> = props => {
    const {currentOrder, setCurrentOrder} = useAuthStore();
    const routeName = useNavigationState(
      state => state.routes[state.index].name,
    );

    const fetchOrderDetails = async () => {
      const data = await getOrderById(currentOrder?.order?._id as string);
      if (data) {
        setCurrentOrder(data);
      }
    };
    useEffect(() => {
      if (currentOrder) {
        const socketInstance = io(SOCKET_URL, {
          transports: ['websocket'],
          withCredentials: false,
        });
        socketInstance.emit('joinRoom', currentOrder?.order?._id);
        socketInstance.on('liveTrackingUpdates', updatedOrder => {
          fetchOrderDetails();
          console.log('Received live tracking updates:', updatedOrder);
        });
        socketInstance.on('orderConfirmed', confirmOrder => {
          fetchOrderDetails();
          console.log(
            'Received live order confirmation updates:',
            confirmOrder,
          );
        });
        return () => {
          socketInstance.disconnect();
        };
      }
    }, [currentOrder]);
    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder && routeName === 'ProductDashboard' && (
          <View
            style={[
              hocStyles.cartContainer,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={styles.flexRow}>
              <View style={styles.img}>
                <Image
                  source={require('@assets/icons/bucket.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
              <View style={{width: '68%'}}>
                <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                  Order is {currentOrder?.order?.status}
                </CustomText>
                <CustomText variant="h9" fontFamily={Fonts.Medium}>
                  Order is{' '}
                  {currentOrder?.order?.items![0]?.item?.name +
                    (currentOrder?.order?.items.length - 1 > 0
                      ? ` and ${
                          currentOrder?.order?.items.length - 1
                        }+ items`
                      : '')}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigate('LiveTracking')}
              style={styles.btn}>
              <CustomText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={{
                  color: Colors.secondary,
                }}>
                View
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return WithLiveStatusComponent;
};

export default withLiveStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    padding: 10,
  },
  img: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.7,
    borderColor: Colors.secondary,
    borderRadius: 5,
  },
});
