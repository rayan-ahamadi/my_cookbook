import {createSlice, current} from '@reduxjs/toolkit';
import {
  fetchRecipeBySeason, 
  fetchRecipeBySearch, 
  fetchRecipes, 
  createRecipe, 
  removeRecipe, 
  modifyRecipe,
  fetchRecipeSlug,
  fetchRecipeFromUser,
  fetchRecipePaginate,
  fetchFavoriteRecipes
} from '../actions/recipeActions';

// Slice
const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipes: [],
    currentRecipe: null,
    totalPages: 0,
    currentPage: 0,
    searchSuggestions: [],
    loading: false,
    searchLoading: false
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetCurrentPage: (state) => {
      state.currentPage = 0;
    }
  },
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
    .addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = [...action.payload.recipes];
      state.loading = false;
    })
    .addCase(fetchRecipes.rejected, (state) => {
      state.loading = false;
    })
    .addCase(createRecipe.pending, (state) => {
      state.loading = true;
    })
    .addCase(createRecipe.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(createRecipe.rejected, (state) => {
      state.loading = false;
    })
    .addCase(removeRecipe.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeRecipe.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(removeRecipe.rejected, (state) => {
      state.loading = false;
    })
    .addCase(modifyRecipe.pending, (state) => {
      state.loading = true;
    })
    .addCase(modifyRecipe.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(modifyRecipe.rejected, (state) => {
      state.loading = false;
    })
    .addCase(fetchRecipeSlug.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchRecipeSlug.fulfilled, (state, action) => {
      state.currentRecipe = action.payload.recipe;
      state.loading = false;
    })
    .addCase(fetchRecipeSlug.rejected, (state) => {
      state.loading = false;
    })
    .addCase(fetchRecipeFromUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchRecipeFromUser.fulfilled, (state, action) => {
      state.recipes = action.payload.userRecipes;
      state.loading = false;
    })  
    .addCase(fetchRecipeFromUser.rejected, (state) => {
      state.loading = false;
    })
    .addCase(fetchRecipePaginate.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchRecipePaginate.fulfilled, (state, action) => {
      state.recipes = [...action.payload.recipes];
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
    })
    .addCase(fetchRecipePaginate.rejected, (state) => {
      state.loading = false;
    })
    .addCase(fetchFavoriteRecipes.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
      state.recipes = [...action.payload.recipes];
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
    })
    .addCase(fetchFavoriteRecipes.rejected, (state) => {
      state.loading = false;
    })
  }
});

export const { setCurrentPage, resetCurrentPage } = recipeSlice.actions;

export default recipeSlice.reducer;