import { apiInstance } from "./axiosApi";
import { GET_DIAMOND_SHAPES, GET_DIAMOND_SHAPE_PRODUCTS } from "../../api/constApi";

export const diamondShapeService = {
    getDiamondShapes: async () => {
        const response = await apiInstance.post(GET_DIAMOND_SHAPES);
        return response.data;
    },
    getProductsByDiamondShape: async (id) => {
        const response = await apiInstance.post(GET_DIAMOND_SHAPE_PRODUCTS, { id });
        return response.data;
    },
};
