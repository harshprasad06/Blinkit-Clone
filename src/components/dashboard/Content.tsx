import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AdCarousal from './AdCarousal';
import {adData, categories} from '@utils/dummyData';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Bestsellers
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Snacks & Drinks
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Home & Lifestyle
      </CustomText>
      <CategoryContainer data={categories} />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
