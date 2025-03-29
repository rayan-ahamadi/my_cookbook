import {createSlice} from '@reduxjs/toolkit';
import {loginUser, registerUser} from '../actions/userActions';


// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    getUser: (state) => {
      const user = localStorage.getItem('user');
      if (user) {
        state.user = user ? JSON.parse(user) : null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(action.payload.user)); 
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


// Actions
export const {logout, getUser} = userSlice.actions;
export default userSlice.reducer;
