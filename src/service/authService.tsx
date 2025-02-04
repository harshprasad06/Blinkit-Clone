import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {appAxios} from './apiInterceptors';
import { Alert } from 'react-native';
export const customerLogin = async (phone: string) => {
  try {
    console.log('phone', phone);
    const response = await axios.post(`${BASE_URL}/customer/login`, {phone});
    const {accesToken, refershToken, customer} = response?.data;
    console.log("accesToken",accesToken)
    console.log("refershToken",refershToken)
    console.log("customer",customer)


    tokenStorage.set('accessToken', accesToken);
    tokenStorage.set('refreshToken', refershToken);
    const {setUser} = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    console.log('Login Error', error);
  }
};

export const refresh_tokens = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken') as string;
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });
    const new_access_token = response?.data?.accesToken;
    const new_refresh_token = response?.data?.refershToken;
    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refreshToken', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log('Refresh Token Error', error);
    tokenStorage.clearAll();
    resetAndNavigate('CustomerLogin');
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get(`/user`);
    setUser(response?.data?.user);
  } catch (error) {
    console.log('Error fetching user', error);
  }
};

export const deliveryLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    console.log("response",response.data)
    const {accesToken, refershToken, deliveryPartner} = response?.data;
    tokenStorage.set('accessToken', accesToken);
    tokenStorage.set('refreshToken', refershToken);
    const {setUser} = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (error) {
    console.log('Login Error', error);
  }
};
