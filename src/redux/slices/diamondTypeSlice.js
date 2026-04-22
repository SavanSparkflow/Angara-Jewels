import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { diamondTypeService } from '../services/diamondTypeService';

export const getDiamondTypes = createAsyncThunk(
    'diamondType/all',
    async (_, { rejectWithValue }) => {
        try {
            const response = await diamondTypeService.getDiamondTypes();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch diamond types');
        }
    }
);

const initialState = {
    diamondTypes: [],
    loading: false,
    error: null,
};

const diamondTypeSlice = createSlice({
    name: 'diamondType',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDiamondTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDiamondTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.diamondTypes = action.payload.data;
            })
            .addCase(getDiamondTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default diamondTypeSlice.reducer;
