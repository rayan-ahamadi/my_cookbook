import api from '../../configs/axiosConfig';

const getRecipeBySeason = async (season) => {
  const response = await api.get('/recipe/season/' + season);
  return response.data;
};

const getRecipeById = async (id) => {
  const response = await api.get('/recipe/' + id);
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
  const response = await api.post('protected/recipe', recipe);
  return response.data;
}

const updateRecipe = async (recipe) => {
  const response = await api.put('protected/recipe', recipe);
  return response.data;
} 

const deleteRecipe = async (id) => {
  const response = await api.delete('protected/recipe/' + id);
  return response.data;
}

export { 
  getRecipeBySeason, 
  getRecipeById, 
  getRecipeBySearch,
  getRecipes, // à protéger quand y'aura l'authentification
  addRecipe,// à protéger quand y'aura l'authentification
  updateRecipe, // à protéger quand y'aura l'authentification
  deleteRecipe // à protéger quand y'aura l'authentification
};