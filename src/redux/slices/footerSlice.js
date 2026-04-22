import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { footerService } from '../services/footerService';
import { GET_FOOTER } from '../../api/constApi';

export const getFooter = createAsyncThunk(GET_FOOTER, async (_, { rejectWithValue }) => {
    try {
        const response = await footerService.getFooter();
        return response.data; // Footer API response structure has `data` object
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const initialState = {
    footerData: null,
    loading: false,
    error: null,
};

const footerSlice = createSlice({
    name: 'footer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFooter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFooter.fulfilled, (state, action) => {
                state.loading = false;
                state.footerData = action.payload;
            })
            .addCase(getFooter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default footerSlice.reducer;
