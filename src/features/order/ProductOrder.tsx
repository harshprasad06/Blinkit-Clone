import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import {Colors, Fonts} from '@utils/Constants';
import OrderList from './OrderList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import {useCartStore} from '@state/cartStore';
import BillDetails from './BillDetails';
// import {hocStyles} from '@styles/globalStyles';
import {useAuthStore} from '@state/authStore';
import ArrowButton from '@components/ui/ArrowButton';
import {navigate} from '@utils/NavigationUtils';
import { createOrder } from '@service/orderService';

const ProductOrder: FC = () => {
  const {getTotalPrice, cart, clearCart} = useCartStore();
  const {user, currentOrder, setCurrentOrder} = useAuthStore();
  const [loading, setLoading] = useState(false);
  const totalItemPrice = getTotalPrice();

  const handlePlaceOrder = async () => {
    if (currentOrder !== null) {
        console.log(currentOrder,"")
      Alert.alert('Warning', 'Let your first order be delivered');
      return;
    }
    const formattedData = cart?.map(item => ({
      id: item._id,
      item: item?._id,
      count: item?.count,
    }));
    if (formattedData?.length === 0) {
      Alert.alert('Warning', 'Add any item to place order');
      return;
    }
    setLoading(true);
    const data = await createOrder(formattedData, totalItemPrice);
    if (data != null) {
      setCurrentOrder(data);
      clearCart();
      navigate('OrderSuccess', {...data});
    } else {
      Alert.alert('Warning', 'There was an error');
    }
    setLoading(false);
  };
  return (
    <View style={{flex:1}}>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image
              source={require('@assets/icons/coupon.png')}
              style={{width: 25, height: 25}}
            />
            <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
              Use Coupons
            </CustomText>
          </View>
          <Icon name="chevron-right" size={RFValue(16)} color={Colors.text} />
        </View>

        <BillDetails totalItemPrice={totalItemPrice} />

        <View style={styles.flexRowBetween}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomText>
            <CustomText
              variant="h9"
              style={styles.cancelText}
              fontFamily={Fonts.SemiBold}>
              Orders cannot be cancelled once packed for delivery, In case of
              unexpected delays, a refund will be provided, if applicable
            </CustomText>
          </View>
        </View>
      </ScrollView>

      <View 
      style={styles.cartContainer}
        >
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require('@assets/icons/home.png')}
                style={{width: 20, height: 20}}
              />
              <View style={{width: '75%'}}>
                <CustomText variant="h8" fontFamily={Fonts.Medium}>
                  Delivering to Home
                </CustomText>
                <CustomText
                  variant="h9"
                  numberOfLines={2}
                  style={{opacity: 0.6}}>
                  {user?.address}
                </CustomText>
              </View>
            </View>

            <TouchableOpacity>
              <CustomText
                variant="h8"
                style={{color: Colors.secondary}}
                fontFamily={Fonts.Medium}>
                Change
              </CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentGateway}>
            <View style={{width: '30%'}}>
              <CustomText
                variant="h8"
                fontFamily={Fonts.Regular}
                fonSize={RFValue(6)}>
                💵 PAY USING
              </CustomText>
              <CustomText
                variant="h9"
                style={{marginTop: 2}}
                fontFamily={Fonts.Regular}
                fonSize={RFValue(6)}>
                Cash on Delivery
              </CustomText>
            </View>

            <View style={{width: '70%'}}>
              <ArrowButton
                loading={loading}
                price={totalItemPrice}
                title="Place Order"
                onPress={handlePlaceOrder}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductOrder;

const styles = StyleSheet.create({
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    paddingBottom: 250,
  },
  flexRowBetween: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 15,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  addressContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  paymentGateway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
  },
  cartContainer : {
    position : 'absolute',
    bottom : 0,
    width : '100%',
    backgroundColor : '#fff',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    elevation:10,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 5,
}
});
