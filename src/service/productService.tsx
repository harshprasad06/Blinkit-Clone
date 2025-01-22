import axios from "axios";
import { BASE_URL } from "./config";

export const getAllCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response?.data?.categories;

    } catch (error) {
      console.log('Error Fetch Categories', error);
      return [];
    }
  };

  export const getProductsByCategoryId = async (id:string) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response?.data?.products;

    } catch (error) {
      console.log('Error Fetch products', error);
      return [];
    }
  };