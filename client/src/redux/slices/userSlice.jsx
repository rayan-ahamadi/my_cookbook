import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {login, register, getUser} from '../../services/api/entities/user/fetchUser';

// Fonctions Asynchrones
export const loginUser = createAsyncThunk(
  'user/login',
  async (formData) => {
    const response = await login(formData);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (formData) => {
    const response = await register(formData);
    return response;
  }
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
    })
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
    }) 
  }
});

export default userSlice.reducer;
