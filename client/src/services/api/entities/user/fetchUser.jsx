import api from '../../configs/axiosConfig';

const login = async (formData) => {
  const response = await api.post('/user/login', formData);
  return response.data;
};

const register = async (formData) => {
  const response = await api.post('/user/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

const refreshToken = async () => {
  const response = await api.post('/refresh');
  return response.data;
}

const getUser = async (id) => {
  const response = await api.get('/protected/user/' + id);
  return response.data;
}

const addRecipeToFavorite = async (recipeId) => {
  const response = await api.post('/protected/user/fav/' + recipeId);
  return response.data;
}

const removeRecipeToFavorite = async (recipeId) => {
  const response = await api.delete('/protected/user/fav/' + recipeId);
  return response.data;
}


export { login, register, getUser, refreshToken, addRecipeToFavorite,removeRecipeToFavorite };