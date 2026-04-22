import { apiInstance } from "./axiosApi";
import { ADD_REVIEW, GET_PRODUCT_BY_ID, GET_PRODUCTS, UPDATE_REVIEW, GET_SIMILAR_PRODUCTS, GET_MOST_LIKED_PRODUCTS } from "../../api/constApi";

export const productService = {
    getProductById: (payload) => {
        return apiInstance.post(GET_PRODUCT_BY_ID, payload);
    },
    getProducts: (payload) => {
        return apiInstance.post(GET_PRODUCTS, payload);
    },
    getSimilarProducts: (payload) => {
        return apiInstance.post(GET_SIMILAR_PRODUCTS, payload);
    },
    getMostLikedProducts: () => {
        return apiInstance.post(GET_MOST_LIKED_PRODUCTS, {});
    },
    addReview: (payload) => {
        return apiInstance.post(ADD_REVIEW, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    updateReview: (payload) => {
        return apiInstance.post(UPDATE_REVIEW, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
};
