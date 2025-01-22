import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  StickyView,
  useCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import {Colors} from '@utils/Constants';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import SearchBar from '@components/dashboard/SearchBar';

const StickySearchBar = () => {
  const {scrollY} = useCollapsibleContext();
  const animatedShadowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 140], [0, 1]);
    return {opacity};
  });
  const backgrondColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [1, 80], [0, 1]);
    return {backgroundColor: `rgba(255,255,255,${opacity})`};
  });
  return (
    <StickyView style={[backgrondColorChanges]}>
      <SearchBar />
      <Animated.View style={[styles.shadow, animatedShadowStyle]} />
    </StickyView>
  );
};

export default StickySearchBar;

const styles = StyleSheet.create({
  shadow: {
    height: 15,
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
});
