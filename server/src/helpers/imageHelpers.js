const path = require('path');
const fs = require('fs');


const deleteRecipeImage = (id) => {
    const recipe = Recipe.findById(id);
    if(recipe.image !== 'recipe/default.jpg'){
        fs.unlinkSync(path.join(__dirname, '../../uploads/recipe/', recipe.image));
    }
}

const deleteAvatar = (id) => {
    const user = User.findById(id);
    if(user.avatar !== 'avatar/default.jpg'){
        fs.unlinkSync(path.join(__dirname, '../../uploads/avatar/', user.avatar));
    }
}


module.exports = { deleteRecipeImage, deleteAvatar };