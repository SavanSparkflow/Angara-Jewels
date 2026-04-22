import { apiInstance } from "./axiosApi";
import { GET_FEATURED, GET_FEATURED_PRODUCTS } from "../../api/constApi";

export const collectionService = {
    getCollections: async (payload) => {
        const response = await apiInstance.post(GET_FEATURED, payload);
        return response.data;
    },
    getFeaturedProducts: async (payload) => {
        const response = await apiInstance.post(GET_FEATURED_PRODUCTS, payload);
        return response.data;
    },
};
