import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { diamondService } from "../services/diamondService";

export const getDiamondTypes = createAsyncThunk(
    "diamond/getTypes",
    async (_, thunkAPI) => {
        try {
            return await diamondService.getDiamondTypes();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getDiamondShapes = createAsyncThunk(
    "diamond/getShapes",
    async (_, thunkAPI) => {
        try {
            return await diamondService.getDiamondShapes();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getDiamondColors = createAsyncThunk(
    "diamond/getColors",
    async (_, thunkAPI) => {
        try {
            return await diamondService.getDiamondColors();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getDiamondClarities = createAsyncThunk(
    "diamond/getClarities",
    async (_, thunkAPI) => {
        try {
            return await diamondService.getDiamondClarities();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getDiamondCuts = createAsyncThunk(
    "diamond/getCuts",
    async (_, thunkAPI) => {
        try {
            return await diamondService.getDiamondCuts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getDiamonds = createAsyncThunk(
    "diamond/getDiamonds",
    async (filters, thunkAPI) => {
        try {
            return await diamondService.getDiamonds(filters);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getDiamondStats = createAsyncThunk(
    "diamond/getStats",
    async (_, thunkAPI) => {
        try {
            return await diamondService.getDiamondStats();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getDiamondById = createAsyncThunk(
    "diamond/getById",
    async (id, thunkAPI) => {
        try {
            return await diamondService.getDiamondById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    types: [],
    shapes: [],
    colors: [],
    clarities: [],
    cuts: [],
    diamonds: [],
    stats: null,
    selectedDiamond: null,
    totalDiamonds: 0,
    loading: false,
    error: null,
};

const diamondSlice = createSlice({
    name: "diamond",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Types
            .addCase(getDiamondTypes.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDiamondTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.types = action.payload.data;
            })
            .addCase(getDiamondTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Shapes
            .addCase(getDiamondShapes.fulfilled, (state, action) => {
                state.shapes = action.payload.data;
            })
            // Colors
            .addCase(getDiamondColors.fulfilled, (state, action) => {
                state.colors = action.payload.data;
            })
            // Clarities
            .addCase(getDiamondClarities.fulfilled, (state, action) => {
                state.clarities = action.payload.data;
            })
            // Cuts
            .addCase(getDiamondCuts.fulfilled, (state, action) => {
                state.cuts = action.payload.data;
            })
            // Diamonds
            .addCase(getDiamonds.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDiamonds.fulfilled, (state, action) => {
                state.loading = false;
                state.diamonds = action.payload.data;
                state.totalDiamonds = action.payload.count;
            })
            .addCase(getDiamonds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Stats
            .addCase(getDiamondStats.fulfilled, (state, action) => {
                state.stats = action.payload.data;
            })
            // Individual Diamond
            .addCase(getDiamondById.pending, (state) => {
                state.loading = true;
                state.selectedDiamond = null;
            })
            .addCase(getDiamondById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedDiamond = action.payload.data;
            })
            .addCase(getDiamondById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = diamondSlice.actions;
export default diamondSlice.reducer;
