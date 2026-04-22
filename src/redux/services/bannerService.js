import { apiInstance } from "./axiosApi";
import { GET_BANNERS } from "../../api/constApi";

export const bannerService = {
    getBanners: async () => {
        const response = await apiInstance.post(GET_BANNERS);
        return response.data;
    },
};
