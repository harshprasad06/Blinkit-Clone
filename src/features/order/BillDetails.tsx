import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';

const ReportItem: FC<{
  iconName: string;
  underline?: boolean;
  title: string;
  price: number;
}> = ({iconName, underline, title, price}) => {
  return (
    <View style={[styles.flexRowBetween, {marginBottom: 10}]}>
      <View style={styles.flexRow}>
        <Icon
          name={iconName}
          size={RFValue(12)}
          style={{opacity: 0.7}}
          color={Colors.text}
        />
        <CustomText
          variant="h8"
          style={{
            textDecorationLine: underline ? 'underline' : 'none',
            textDecorationStyle: 'dashed',
          }}>
          {title}
        </CustomText>
      </View>
      <CustomText variant="h8">₹ {price}</CustomText>
    </View>
  );
};
const BillDetails: FC<{totalItemPrice: number}> = ({totalItemPrice}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>
        Bill Details
      </CustomText>

      <View style={styles.billContainer}>
        <ReportItem
          iconName="article"
          title="Item Total"
          price={totalItemPrice}
        />
        <ReportItem iconName="pedal-bike" title="Delivery charge" price={29} />
        <ReportItem iconName="shopping-bag" title="Handling charge" price={2} />
        <ReportItem iconName="cloudy-snowing" title="Surge charge" price={2} />
      </View>

      <View style={[styles.flexRowBetween, {marginBottom: 15}]}>
        <CustomText
          variant="h7"
          fontFamily={Fonts.SemiBold}
          style={styles.text}>
          Grand Total
        </CustomText>
        <CustomText
          variant="h7"
          fontFamily={Fonts.SemiBold}
          style={styles.text}>
          ₹ {totalItemPrice + 34}
        </CustomText>
      </View>
    </View>
  );
};

export default BillDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
  },
  text: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});
