import { apiInstance } from "./axiosApi";
import { GET_FOOTER } from "../../api/constApi";

export const footerService = {
    getFooter: async () => {
        const response = await apiInstance.post(GET_FOOTER);
        return response.data;
    },
};
