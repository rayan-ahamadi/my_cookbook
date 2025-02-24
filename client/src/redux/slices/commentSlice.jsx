import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {getCommentByRecipe} from '../../services/api/entities/comment/fetchComment';

// Fonction Asynchrones
export const fetchCommentByRecipe = createAsyncThunk(
  'comment/fetchByRecipe',
  async (recipeId) => {
    const response = await getCommentByRecipe(recipeId);
    return response;
  }
);



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