import { apiInstance } from "./axiosApi";
import { ADD_ADDRESS, UPDATE_ADDRESS, GET_ADDRESSES, DELETE_ADDRESS } from "../../api/constApi";

export const addressService = {
    getAddresses: () => {
        return apiInstance.post(GET_ADDRESSES);
    },
    addAddress: (payload) => {
        return apiInstance.post(ADD_ADDRESS, payload);
    },
    updateAddress: (payload) => {
        return apiInstance.post(UPDATE_ADDRESS, payload);
    },
    deleteAddress: (payload) => {
        return apiInstance.post(DELETE_ADDRESS, payload);
    },
};
