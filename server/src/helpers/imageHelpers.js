const path = require('path');
const fs = require('fs');
const Recipe = require('../entities/recipe/recipe.model');
const User = require('../entities/user/user.model');


const deleteRecipeImage = async (id) => {
    const recipe = await Recipe.findById(id);
    console.log(recipe.image);
    if(recipe.image && !recipe.image.includes("default")){
        fs.unlinkSync(path.join(__dirname, '../uploads/image/recipe/', recipe.image));
    }
}

const deleteAvatar = async (id) => {
    const user = await User.findById(id);
    if(user.avatar && !user.avatar.includes("default")){
        fs.unlinkSync(path.join(__dirname, '../../uploads/avatar/', user.avatar));
    }
}


module.exports = { deleteRecipeImage, deleteAvatar };