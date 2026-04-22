import { apiInstance } from "./axiosApi";
import { GET_DIAMOND_TYPES } from "../../api/constApi";

export const diamondTypeService = {
    getDiamondTypes: () => {
        return apiInstance.post(GET_DIAMOND_TYPES);
    },
};
