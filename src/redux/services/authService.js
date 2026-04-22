import { apiInstance } from "./axiosApi";
import { LOGIN, REGISTER, GET_PROFILE, UPDATE_PROFILE, FORGOT_PASSWORD, RESET_PASSWORD } from "../../api/constApi";

export const authService = {
    login: async (credentials) => {
        const response = await apiInstance.post(LOGIN, credentials);
        return response.data;
    },
    register: async (userData) => {
        const response = await apiInstance.post(REGISTER, userData);
        return response.data;
    },
    getProfile: async () => {
        const response = await apiInstance.post(GET_PROFILE);
        return response.data;
    },
    updateProfile: async (payload) => {
        // multipart/form-data for uploads
        const response = await apiInstance.post(UPDATE_PROFILE, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    forgotPassword: async (emailData) => {
        const response = await apiInstance.post(FORGOT_PASSWORD, emailData);
        return response.data;
    },
    resetPassword: async (resetData) => {
        const response = await apiInstance.post(RESET_PASSWORD, resetData);
        return response.data;
    },
};