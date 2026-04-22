import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bannerService } from '../services/bannerService';
import { GET_BANNERS } from '../../api/constApi';

export const getBanners = createAsyncThunk(GET_BANNERS, async (_, { rejectWithValue }) => {
    try {
        const response = await bannerService.getBanners();
        return response.data; // Banner API response structure has `data` array
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const initialState = {
    banners: [],
    loading: false,
    error: null,
};

const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.banners = action.payload;
            })
            .addCase(getBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bannerSlice.reducer;
