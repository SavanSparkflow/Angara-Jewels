import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collectionService } from '../services/collectionService';
import { GET_FEATURED, GET_FEATURED_PRODUCTS } from '../../api/constApi';

export const getCollections = createAsyncThunk('collection/getCollections', async (payload, { rejectWithValue }) => {
    try {
        const response = await collectionService.getCollections(payload);
        // Robust extraction: support both {data: [...]} and just [...]
        const dataArray = response.data?.data || (Array.isArray(response.data) ? response.data : []);
        return { data: dataArray, placement: payload?.placement };
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const getFeaturedProducts = createAsyncThunk('collection/getFeaturedProducts', async (payload, { rejectWithValue }) => {
    try {
        const response = await collectionService.getFeaturedProducts(payload);
        const dataArray = response.data?.data || (Array.isArray(response.data) ? response.data : []);
        return dataArray;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const initialState = {
    collections: [], // Fallback/General
    celebrate: [],
    gifts: [],
    featuredProducts: [], // For specific collection products
    loading: false,
    error: null,
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCollections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCollections.fulfilled, (state, action) => {
                state.loading = false;
                const { data, placement } = action.payload;
                if (placement?.toLowerCase() === 'celebrate') {
                    state.celebrate = data;
                } else if (placement?.toLowerCase() === 'gifts') {
                    state.gifts = data;
                } else {
                    state.collections = data;
                }
            })
            .addCase(getCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getFeaturedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFeaturedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.featuredProducts = action.payload;
            })
            .addCase(getFeaturedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default collectionSlice.reducer;
