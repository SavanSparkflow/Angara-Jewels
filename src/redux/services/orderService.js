import { MY_ORDERS, MY_RETURNS } from "../../api/constApi";
import { apiInstance } from "./axiosApi";

export const orderService = {
    getMyOrders: async () => {
        try {
            const response = await apiInstance.post(MY_ORDERS);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getMyReturns: async () => {
        try {
            const response = await apiInstance.post(MY_RETURNS);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
