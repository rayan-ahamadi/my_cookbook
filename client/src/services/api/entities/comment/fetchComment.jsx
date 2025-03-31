import api from '../../configs/axiosConfig';

const getCommentByRecipe = async (recipeId) => {
  try {
    const response = await api.get(`/comment/recipe/${recipeId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const postComment = async (recipeId, content) => {
  try {
    const response = await api.post(`/protected/comment/recipe/${recipeId}`, content);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du commentaire :", error);
  }
};

const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/protected/comment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire :", error);
  }
}


export {
  getCommentByRecipe,
  postComment,
  deleteComment
}