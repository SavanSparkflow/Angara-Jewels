import { apiInstance } from "./axiosApi";
import { GET_BIRTHSTONES } from "../../api/constApi";

export const birthstoneService = {
    getBirthstones: async () => {
        const response = await apiInstance.post(GET_BIRTHSTONES);
        return response.data;
    }
};
