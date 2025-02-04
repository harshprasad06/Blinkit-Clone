import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Colors } from '@utils/Constants';
import { useAuthStore } from '@state/authStore';
import DeliveryHeader from '@components/delivery/DeliveryHeader';

const DeliveryDashboard = () => {
  const {user} = useAuthStore();
  console.log("user",user)
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email}/>
      </SafeAreaView>
      <View style={styles.subContainer}>

      </View>
    </View>
  );
};

export default DeliveryDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor:Colors.primary,
    flex:1
  },
  subContainer: {
    backgroundColor:Colors.backgroundSecondary,
    flex:1,
    padding:6
  },
  flatListContainer: {
    padding:2
  },
  center: {
    flex:1,
    marginTop:60,
    alignItems:'center',
    justifyContent:'center' 
  },
});
