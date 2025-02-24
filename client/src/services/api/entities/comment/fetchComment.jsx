import api from '../../configs/axiosConfig';

const getCommentByRecipe = async (recipeId) => {
  try {
    const response = await api.get(`/comment/${recipeId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


export {
  getCommentByRecipe
}