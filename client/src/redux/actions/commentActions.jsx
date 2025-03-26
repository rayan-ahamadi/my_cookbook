import {getCommentByRecipe} from '../../services/api/entities/comment/fetchComment';
import {createAsyncThunk} from '@reduxjs/toolkit';

// Fonction Asynchrones
export const fetchCommentByRecipe = createAsyncThunk(
  'comment/fetchByRecipe',
  async (recipeId) => {
    const response = await getCommentByRecipe(recipeId);
    return response;
  }
);