import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { diamondShapeService } from '../services/diamondShapeService';
import { GET_DIAMOND_SHAPES, GET_DIAMOND_SHAPE_PRODUCTS } from '../../api/constApi';

export const getDiamondShapes = createAsyncThunk(GET_DIAMOND_SHAPES, async (_, { rejectWithValue }) => {
    try {
        const response = await diamondShapeService.getDiamondShapes();
        return response.data; // Diamond Shape API response structure has `data` array
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const getProductsByDiamondShape = createAsyncThunk(GET_DIAMOND_SHAPE_PRODUCTS, async (id) => {
    try {
        const response = await diamondShapeService.getProductsByDiamondShape(id);
        return response.data.data || []; // Return the actual array
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const initialState = {
    shapes: [],
    products: [],
    loading: false,
    error: null,
};

const diamondShapeSlice = createSlice({
    name: 'diamondShape',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDiamondShapes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDiamondShapes.fulfilled, (state, action) => {
                state.loading = false;
                state.shapes = action.payload;
            })
            .addCase(getDiamondShapes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductsByDiamondShape.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsByDiamondShape.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProductsByDiamondShape.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default diamondShapeSlice.reducer;
