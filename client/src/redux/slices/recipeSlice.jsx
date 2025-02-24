import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getRecipeBySeason} from '../../services/api/entities/recipe/fetchRecipe';


// Fonction Asynchrones
export const fetchRecipeBySeason = createAsyncThunk(
  'recipe/fetchBySeason',
  async (season) => {
    const response = await getRecipeBySeason(season);
    return response;
  }
);


// Slice
const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipes: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchRecipeBySeason.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchRecipeBySeason.fulfilled, (state, action) => {
      state.recipes = action.payload.recipes;
      state.loading = false;
    })
    .addCase(fetchRecipeBySeason.rejected, (state) => {
      state.loading = false;
    })
  }
});

export default recipeSlice.reducer;