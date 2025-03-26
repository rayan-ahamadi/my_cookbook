import {createSlice} from '@reduxjs/toolkit';
import {fetchCommentByRecipe} from '../actions/commentActions';



// Slice
const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCommentByRecipe.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCommentByRecipe.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.loading = false;
    })
    .addCase(fetchCommentByRecipe.rejected, (state) => {
      state.loading = false;
    })
  }
});


export default commentSlice.reducer;