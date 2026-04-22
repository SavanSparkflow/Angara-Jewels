import { apiInstance } from "./axiosApi";
import { ADD_TO_CART, GET_CART, UPDATE_QUANTITY, REMOVE_FROM_CART, CLEAR_CART } from "../../api/constApi";

export const cartService = {
  add: async (cartData) => {
    const response = await apiInstance.post(ADD_TO_CART, cartData);
    return response.data;
  },
  get: async () => {
    const response = await apiInstance.post(GET_CART);
    return response.data;
  },
  updateQuantity: async (data) => {
    const response = await apiInstance.post(UPDATE_QUANTITY, data);
    return response.data;
  },
  remove: async (data) => {
    const response = await apiInstance.post(REMOVE_FROM_CART, data);
    return response.data;
  },
  clear: async () => {
    const response = await apiInstance.post(CLEAR_CART);
    return response.data;
  },
};
