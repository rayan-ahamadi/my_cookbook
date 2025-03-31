import {
  getRecipeBySeason, 
  getRecipeBySearch, 
  getRecipes, 
  addRecipe, 
  deleteRecipe, 
  updateRecipe, 
  getRecipeBySlug, 
  recipeFromUser,
  getRecipePaginate,
  getFavoriteRecipes,
  searchRecipesPaginate
} from '../../services/api/entities/recipe/fetchRecipe';
import {createAsyncThunk} from '@reduxjs/toolkit';


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

export const fetchRecipes = createAsyncThunk(
  'recipe/fetchRecipes',
  async () => {
    const response = await getRecipes();
    return response;
  }
);

export const fetchRecipeSlug = createAsyncThunk(
  'recipe/getById', 
  async (slug) => {
    const response = await getRecipeBySlug(slug);
    return response;
  }
)

export const createRecipe = createAsyncThunk(
  'recipe/addRecipe',
  async (formData) => {
    const response = await addRecipe(formData);
    return response;
  }
)

export const removeRecipe = createAsyncThunk(
  'recipe/deleteRecipe',
  async (id) => {
    const response = await deleteRecipe(id);
    return response;
  }
)

export const modifyRecipe = createAsyncThunk(
  'recipe/updateRecipe',
  async ({ formData, id }) => {
    const response = await updateRecipe(formData, id);
    return response;
  }
)

export const fetchRecipeFromUser = createAsyncThunk(
  'recipe/fetchFromUser',
  async (userId) => {
    const response = await recipeFromUser(userId);
    return response;
  }
)

export const fetchRecipePaginate = createAsyncThunk(
  'recipe/fetchPaginate',
  async (page) => {
    const response = await getRecipePaginate(page);
    return response;
  }
)

export const fetchFavoriteRecipes = createAsyncThunk(
  'recipe/fetchFavorites',
  async (userId, page) => {
    const response = await getFavoriteRecipes(userId, page);
    return response;
  }
)

export const fetchSearchRecipesPaginate = createAsyncThunk(
  'recipe/fetchSearchPaginate',
  async ({search, page}) => {
    const response = await searchRecipesPaginate(search, page);
    return response;
  }
)