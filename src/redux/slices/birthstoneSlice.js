import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { birthstoneService } from "../services/birthstoneService";

export const getBirthstones = createAsyncThunk(
    "birthstone/getBirthstones",
    async (_, thunkAPI) => {
        try {
            return await birthstoneService.getBirthstones();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    birthstones: [],
    loading: false,
    error: null,
};

const birthstoneSlice = createSlice({
    name: "birthstone",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBirthstones.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBirthstones.fulfilled, (state, action) => {
                state.loading = false;
                state.birthstones = action.payload.data;
            })
            .addCase(getBirthstones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default birthstoneSlice.reducer;
