import { apiInstance } from "./axiosApi";
import {
    GET_DIAMOND_TYPES,
    GET_DIAMOND_SHAPES,
    GET_DIAMOND_COLORS,
    GET_DIAMOND_CLARITIES,
    GET_DIAMOND_CUTS,
    GET_DIAMONDS,
    GET_DIAMOND_STATS,
    GET_DIAMOND_BY_ID
} from "../../api/constApi";

export const diamondService = {
    getDiamondTypes: async () => {
        const response = await apiInstance.post(GET_DIAMOND_TYPES);
        return response.data;
    },
    getDiamondShapes: async () => {
        const response = await apiInstance.post(GET_DIAMOND_SHAPES);
        return response.data;
    },
    getDiamondColors: async () => {
        const response = await apiInstance.post(GET_DIAMOND_COLORS);
        return response.data;
    },
    getDiamondClarities: async () => {
        const response = await apiInstance.post(GET_DIAMOND_CLARITIES);
        return response.data;
    },
    getDiamondCuts: async () => {
        const response = await apiInstance.post(GET_DIAMOND_CUTS);
        return response.data;
    },
    getDiamonds: async (filters) => {
        const response = await apiInstance.post(GET_DIAMONDS, filters);
        return response.data;
    },
    getDiamondStats: async () => {
        const response = await apiInstance.get(GET_DIAMOND_STATS);
        return response.data;
    },
    getDiamondById: async (id) => {
        const response = await apiInstance.post(GET_DIAMOND_BY_ID, { id });
        return response.data;
    }
};
