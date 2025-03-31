import {getCommentByRecipe, postComment, deleteComment} from '../../services/api/entities/comment/fetchComment';
import {createAsyncThunk} from '@reduxjs/toolkit';

// Fonction Asynchrones
export const fetchCommentByRecipe = createAsyncThunk(
  'comment/fetchByRecipe',
  async (recipeId) => {
    const response = await getCommentByRecipe(recipeId);
    return response;
  }
);

export const addComment = createAsyncThunk(
  'comment/addComment', 
  async ({ recipeId, content }) => {
    const response = await postComment(recipeId, content);
    return response;
  }
);

export const deleteUserComment = createAsyncThunk(
  'comment/deleteComment',
  async (commentId) => {
    const response = await deleteComment(commentId);
    return response;
  }
);