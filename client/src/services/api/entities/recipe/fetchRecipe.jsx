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

export { 
  getRecipeBySeason, 
  getRecipeBySlug, 
  getRecipeBySearch,
  getRecipes, // à protéger quand y'aura l'authentification
  addRecipe,// à protéger quand y'aura l'authentification
  updateRecipe, // à protéger quand y'aura l'authentification
  deleteRecipe // à protéger quand y'aura l'authentification
};