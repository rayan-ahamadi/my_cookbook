import {createSlice} from '@reduxjs/toolkit';
import {fetchCommentByRecipe, addComment} from '../actions/commentActions';



// Slice
const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    loading: false,
    error: null,
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
      state.error = action.error.message;
    })
    .addCase(addComment.pending, (state) => {
      state.loading = true;
    })
    .addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(addComment.rejected, (state,action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});


export default commentSlice.reducer;