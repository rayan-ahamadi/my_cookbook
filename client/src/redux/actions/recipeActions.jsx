import {getRecipeBySeason, getRecipeBySearch, getRecipes, addRecipe, deleteRecipe, updateRecipe, getRecipeBySlug} from '../../services/api/entities/recipe/fetchRecipe';
import {createAsyncThunk} from '@reduxjs/toolkit';

// Fonction Asynchrones (mettre les actions dans un dossier actions)
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
  async (formData) => {
    const response = await updateRecipe(formData);
    return response;
  }
)
