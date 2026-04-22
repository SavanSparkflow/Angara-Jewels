import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addressService } from '../services/addressService';

export const getAddresses = createAsyncThunk(
    'address/all',
    async (_, { rejectWithValue }) => {
        try {
            const response = await addressService.getAddresses();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch addresses');
        }
    }
);

export const addAddress = createAsyncThunk(
    'address/add',
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const response = await addressService.addAddress(payload);
            dispatch(getAddresses());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add address');
        }
    }
);

export const updateAddress = createAsyncThunk(
    'address/update',
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const response = await addressService.updateAddress(payload);
            dispatch(getAddresses());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update address');
        }
    }
);

export const deleteAddress = createAsyncThunk(
    'address/delete',
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const response = await addressService.deleteAddress(payload);
            dispatch(getAddresses());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete address');
        }
    }
);

const initialState = {
    addresses: [],
    loading: false,
    error: null,
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload.data;
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAddress.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default addressSlice.reducer;
