import {login, register, refreshToken ,getUser, addRecipeToFavorite, removeRecipeToFavorite} from '../../services/api/entities/user/fetchUser';
import {createAsyncThunk} from '@reduxjs/toolkit';

// Fonctions Asynchrones
export const loginUser = createAsyncThunk(
  'user/login',
  async (formData) => {
    const response = await login(formData);
    return response;
  }
);

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (id) => {
    const response = await getUser(id);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (formData) => {
    const response = await register(formData);
    return response;
  }
);

export const refreshUser = createAsyncThunk(
  'user/refresh',
  async () => {
    const response = await refreshToken();
    return response;
  }
);

export const addRecipeFav = createAsyncThunk(
  'user/addRecipeFav',
  async (recipeId) => {
    const response = await addRecipeToFavorite(recipeId);
    return response;
  }
);

export const removeRecipeFav = createAsyncThunk(
  'user/removeRecipeFav',
  async (recipeId) => {
    const response = await removeRecipeToFavorite(recipeId);
    return response;
  }
);