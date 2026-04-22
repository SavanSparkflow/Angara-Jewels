import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoryService } from '../services/categoryService';
import { GET_CATEGORIES } from '../../api/constApi';

export const getCategories = createAsyncThunk(GET_CATEGORIES, async (_, { rejectWithValue }) => {
    try {
        const response = await categoryService.getCategories();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;
