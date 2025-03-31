import api from '../../configs/axiosConfig';

const getRecipeBySeason = async (season) => {
  const response = await api.get('/recipe/season/' + season);
  return response.data;
};

const getRecipeBySlug = async (slug) => {
  const response = await api.get('/recipe/' + slug);
  return response.data;
};

const getRecipeBySearch = async (search) => {
  const response = await api.get('/recipe/search/' + search);
  return response.data;
};

const getRecipePaginate = async (page) => {
  const response = await api.get('/recipe/paginate/' + page);
  return response.data;
};

const getRecipes = async () => {
  const response = await api.get('/recipe');
  return response.data;
}

const addRecipe = async (recipe) => {
  const response = await api.post('/protected/recipe', recipe, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

const updateRecipe = async (recipe) => {
  const response = await api.put('/protected/recipe', recipe, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
} 

const deleteRecipe = async (id) => {
  const response = await api.delete('/protected/recipe/' + id);
  return response.data;
}

const recipeFromUser = async (userId) => {
  const response = await api.get('/protected/recipe/user/' + userId);
  return response.data;
}

const getFavoriteRecipes = async (userId, page) => {
  const response = await api.get('/protected/recipe/fav/' + userId + `/${page}`);
  return response.data;
}

const searchRecipesPaginate = async (search, page) => {
  const response = await api.get('/recipe/search/' + search + '/paginate/' + page);
  return response.data;
}

export { 
  getRecipeBySeason, 
  getRecipeBySlug, 
  getRecipeBySearch,
  getRecipes, 
  addRecipe,
  updateRecipe, 
  deleteRecipe, 
  recipeFromUser,
  getRecipePaginate,
  getFavoriteRecipes,
  searchRecipesPaginate
};