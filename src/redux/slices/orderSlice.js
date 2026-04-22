import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../services/orderService";

const initialState = {
    orders: [],
    returns: [],
    loading: false,
    error: null,
};

export const getMyOrders = createAsyncThunk(
    "order/getMyOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await orderService.getMyOrders();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getMyReturns = createAsyncThunk(
    "order/getMyReturns",
    async (_, { rejectWithValue }) => {
        try {
            const response = await orderService.getMyReturns();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearOrderError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.data || [];
            })
            .addCase(getMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getMyReturns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyReturns.fulfilled, (state, action) => {
                state.loading = false;
                state.returns = action.payload.data || [];
            })
            .addCase(getMyReturns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
