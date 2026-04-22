import { apiInstance } from "./axiosApi";
import { GET_CATEGORIES } from "../../api/constApi";

export const categoryService = {
    getCategories: async () => {
        const response = await apiInstance.post(GET_CATEGORIES);
        return response.data;
    },
};

