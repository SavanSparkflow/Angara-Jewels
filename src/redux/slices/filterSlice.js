import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filterService } from '../services/filterService';

export const getFilters = createAsyncThunk(
    'filter/all',
    async (_, { rejectWithValue }) => {
        try {
            const response = await filterService.getFilters();
            return response.data; // This is the success/data wrapper
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch filters');
        }
    }
);

const initialState = {
    filters: null,
    loading: false,
    error: null,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFilters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.filters = action.payload.data;
            })
            .addCase(getFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default filterSlice.reducer;
