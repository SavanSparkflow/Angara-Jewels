import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../services/productService';

export const getProductById = createAsyncThunk(
    'product/getById',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await productService.getProductById(payload);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product detail');
        }
    }
);

export const getProducts = createAsyncThunk(
    'product/list',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await productService.getProducts(payload);
            return response.data; // Structure has success, data, and count
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const getTrendingProducts = createAsyncThunk(
    'product/trending',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await productService.getProducts(payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch trending products');
        }
    }
);

export const getSimilarProducts = createAsyncThunk(
    'product/similar',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await productService.getSimilarProducts(payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch similar products');
        }
    }
);

export const getMostLikedProducts = createAsyncThunk(
    'product/mostLiked',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productService.getMostLikedProducts();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch most liked products');
        }
    }
);

export const addReview = createAsyncThunk(
    'product/addReview',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await productService.addReview(payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add review');
        }
    }
);

export const updateReview = createAsyncThunk(
    'product/updateReview',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await productService.updateReview(payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update review');
        }
    }
);

const initialState = {
    products: [],
    trendingProducts: [],
    similarProducts: [],
    mostLikedProducts: [],
    count: 0,
    currentProduct: null,
    loading: false,
    trendingLoading: false,
    similarLoading: false,
    mostLikedLoading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
                state.count = action.payload.count;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTrendingProducts.pending, (state) => {
                state.trendingLoading = true;
                state.error = null;
            })
            .addCase(getTrendingProducts.fulfilled, (state, action) => {
                state.trendingLoading = false;
                state.trendingProducts = action.payload.data;
            })
            .addCase(getTrendingProducts.rejected, (state, action) => {
                state.trendingLoading = false;
                state.error = action.payload;
            })
            .addCase(getSimilarProducts.pending, (state) => {
                state.similarLoading = true;
                state.error = null;
            })
            .addCase(getSimilarProducts.fulfilled, (state, action) => {
                state.similarLoading = false;
                state.similarProducts = action.payload.data;
            })
            .addCase(getSimilarProducts.rejected, (state, action) => {
                state.similarLoading = false;
                state.error = action.payload;
            })
            .addCase(getMostLikedProducts.pending, (state) => {
                state.mostLikedLoading = true;
                state.error = null;
            })
            .addCase(getMostLikedProducts.fulfilled, (state, action) => {
                state.mostLikedLoading = false;
                state.mostLikedProducts = action.payload.data;
            })
            .addCase(getMostLikedProducts.rejected, (state, action) => {
                state.mostLikedLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
