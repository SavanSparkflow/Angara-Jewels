import { apiInstance } from "./axiosApi";
import { GET_FILTERS } from "../../api/constApi";

export const filterService = {
    getFilters: () => {
        return apiInstance.get(GET_FILTERS);
    },
};
