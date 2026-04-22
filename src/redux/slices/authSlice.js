import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from "../services/authService";
import { LOGIN, REGISTER } from '../../api/constApi';

export const logInAdmin = createAsyncThunk(LOGIN, async (payload, { rejectWithValue }) => {
    try {
        const response = await authService.login(payload);
        return response; // authService already returns response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const registerAdmin = createAsyncThunk(REGISTER, async (payload, { rejectWithValue }) => {
    try {
        const response = await authService.register(payload);
        return response; // authService already returns response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
    try {
        const response = await authService.getProfile();
        return response; // authService already returns response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (payload, { rejectWithValue }) => {
    try {
        const response = await authService.updateProfile(payload);
        return response; // authService already returns response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const getValidToken = () => {
  const token = localStorage.getItem('token');
  if (token === null || token === 'null' || token === 'undefined' || token === '') {
    return null;
  }
  return token;
};

const initialState = {
  user: null,
  token: getValidToken(),
  isAuthenticated: !!getValidToken(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!token;
      if (token) {
        localStorage.setItem('token', token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
        // Login
        .addCase(logInAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logInAdmin.fulfilled, (state, action) => {
            state.loading = false;
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            if (token) {
                localStorage.setItem('token', token);
            }
        })
        .addCase(logInAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Register
        .addCase(registerAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerAdmin.fulfilled, (state, action) => {
            state.loading = false;
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            if (token) {
                localStorage.setItem('token', token);
            }
        })
        .addCase(registerAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Get Profile
        .addCase(getProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user || action.payload.data || action.payload;
        })
        .addCase(getProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Update Profile
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user || action.payload.data || action.payload;
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setCredentials, logout, clearError } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
