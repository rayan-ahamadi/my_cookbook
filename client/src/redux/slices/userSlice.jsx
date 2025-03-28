import {createSlice} from '@reduxjs/toolkit';
import {loginUser, registerUser} from '../actions/userActions';


// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
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
    .addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
    }) 
    .addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
  }
});

export default userSlice.reducer;
