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

export { getRecipeBySeason, getRecipeById, getRecipeBySearch };