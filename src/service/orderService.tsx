import {appAxios} from './apiInterceptors';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post(`/order`, {
      items,
      branch: '673596709a96070136021a84',
      totalPrice,
    });
    return response?.data;
  } catch (error) {
    console.log('Error Creating Order', error);
    return null;
  }
};
export const getOrderById = async (id:string) => {
    try {
      const response = await appAxios.get(`/order/${id}`);
      return response?.data;
    } catch (error) {
      console.log('Error fetching Order by Id', error);
      return null;
    }
  };
  export const fetchCustomerOrder = async (userId:string) => {
    try {
      const response = await appAxios.get(`/orders?customerId=${userId}`);
      return response?.data;
    } catch (error) {
      console.log('Error fetching Orders', error);
      return null;
    }
  };
