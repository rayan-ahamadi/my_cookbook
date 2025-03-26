import {login, register, getUser} from '../../services/api/entities/user/fetchUser';
import {createAsyncThunk} from '@reduxjs/toolkit';

// Fonctions Asynchrones
export const loginUser = createAsyncThunk(
  'user/login',
  async (formData) => {
    const response = await login(formData);
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