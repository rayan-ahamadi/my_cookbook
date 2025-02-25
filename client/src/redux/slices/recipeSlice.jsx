import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getRecipeBySeason, getRecipeBySearch} from '../../services/api/entities/recipe/fetchRecipe';


// Fonction Asynchrones
export const fetchRecipeBySeason = createAsyncThunk(
  'recipe/fetchBySeason',
  async (season) => {
    const response = await getRecipeBySeason(season);
    return response;
  }
);

export const fetchRecipeBySearch = createAsyncThunk(
  'recipe/fetchBySearch',
  async (search) => {
    const response = await getRecipeBySearch(search);
    return response;
  }
);


// Slice
const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipes: [],
    searchSuggestions: [],
    loading: false,
    searchLoadin: false
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
    .addCase(fetchRecipeBySearch.pending, (state) => {
      state.searchLoading = true;
    })
    .addCase(fetchRecipeBySearch.fulfilled, (state, action) => {
      state.searchSuggestions = action.payload.recipes;
      state.searchLoading = false;
    })
    .addCase(fetchRecipeBySearch.rejected, (state) => {
      state.searchLoading = false;
    })
  }
});

export default recipeSlice.reducer;