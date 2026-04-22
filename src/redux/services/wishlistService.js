import { apiInstance } from "./axiosApi";
import { ADD_TO_WISHLIST, GET_WISHLIST, REMOVE_FROM_WISHLIST, MOVE_TO_CART } from "../../api/constApi";

export const wishlistService = {
  add: async (wishlistData) => {
    const response = await apiInstance.post(ADD_TO_WISHLIST, wishlistData);
    return response.data;
  },
  get: async () => {
    const response = await apiInstance.post(GET_WISHLIST);
    return response.data;
  },
  remove: async (data) => {
    const response = await apiInstance.post(REMOVE_FROM_WISHLIST, data);
    return response.data;
  },
  moveToCart: async (itemId) => {
    const response = await apiInstance.post(MOVE_TO_CART, { itemId });
    return response.data;
  },
};
