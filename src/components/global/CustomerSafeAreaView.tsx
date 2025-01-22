import {SafeAreaView, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC, ReactNode} from 'react';

interface CustomerSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomerSafeAreaView: FC<CustomerSafeAreaViewProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default CustomerSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
