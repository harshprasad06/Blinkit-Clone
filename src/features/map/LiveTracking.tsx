import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAuthStore} from '@state/authStore';
import {getOrderById} from '@service/orderService';
import {Colors, Fonts} from '@utils/Constants';
import LiveHeader from './LiveHeader';
import LiveMap from './LiveMap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';

const LiveTracking = () => {
  const {currentOrder, setCurrentOrder} = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?._id as any);
    setCurrentOrder(data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);
  let msg = 'Packing your order';
  let time = 'Arriving in 10 Mintues';
  if (currentOrder?.status === 'confirmed') {
    msg = 'Arriving soon';
    time = 'Arriving in 8 Mintues';
  } else if (currentOrder?.status === 'arriving') {
    msg = 'Order Picked Up';
    time = 'Arriving in 6 Mintues';
  } else if (currentOrder?.status === 'delivered') {
    msg = 'Order Delivered';
    time = 'Fastest Delivery ⚡️';
  }

  return (
    <View style={styles.container}>
      <LiveHeader type="Customer" title={msg} secondTitle={time} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LiveMap />

        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Icon
              name={currentOrder?.deliveryPartner ? 'phone' : 'shopping'}
              color={Colors.disabled}
              size={RFValue(25)}
            />
          </View>

          <View style={{width: '82%'}}>
            <CustomText
              numberOfLines={1}
              variant="h7"
              fontFamily={Fonts.SemiBold}>
              {currentOrder?.deliveryPartner?.name ||
                'We will soon assign a delivery partner'}
            </CustomText>

            {currentOrder?.deliveryPartner && (
              <CustomText variant="h7" fontFamily={Fonts.Medium}>
                {currentOrder?.deliveryPartner?.phone}
              </CustomText>
            )}

            <CustomText variant="h9" fontFamily={Fonts.Medium}>
              {currentOrder?.deliveryPartner
                ? 'For Delivery instrucation you can contact here jj'
                : msg}
            </CustomText>
          </View>
        </View>
        {/* <DeliveryDetails details={} /> */}
      </ScrollView>
    </View>
  );
};

export default LiveTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
