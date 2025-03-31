import useForm from "../../../../../hooks/useForm"
import {useDispatch,useSelector} from "react-redux"
import {createRecipe, modifyRecipe, fetchRecipeFromUser} from "../../../../../redux/actions/recipeActions"
import TextEditor from "../TextEditor/TextEditor"
import { TagsInput } from "react-tag-input-component";
import InputIngredients from "../InputIngredients/InputIngredients";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./RecipeForm.css"
import { use } from "react";


function RecipeForm() {
    const {id} = useParams();
    const recipes = useSelector(state => state.recipe.recipes);
    const user = useSelector(state => state.user.user);
    let initialState = null;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);
    

    if (!id) {
        initialState = {
            title : "",
            description: "",
            ingredients: [],
            instructions: "",
            recipeImage: null,
            season: "",
            difficulty: "", 
            duration: 0,
            author: user._id,
            authorName: user.username,
            tags: [],
            slug: ""
        }
    } else {
        // Récupérer la recette à modifier via l'id
        initialState = recipes.find(recipe => recipe._id === id);
    }

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-');        // Replace multiple - with single -
    };

    const handleFormSubmit = (e) => {
        e.preventDefault;
        formData.slug = slugify(formData.title);
        if (id) {
            dispatch(modifyRecipe({formData, id: formData._id})).then(() => {
                dispatch(fetchRecipeFromUser());
                navigate('/dashboard/my-recipes');
            });
        } else {
            dispatch(createRecipe(formData)).then(() => {
                dispatch(fetchRecipeFromUser());
                navigate('/dashboard/my-recipes');
            });
        }
    }

    const {formData,handleInputChange,handleSubmit} = useForm(initialState,handleFormSubmit)
    const dispatch = useDispatch();

    return <main className="recipe-form">
        <h1>Ajouter une nouvelle recette</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image de recette</label>
                <input
                    type="file"
                    id="image"
                    name="recipeImage"
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="ingredients">Ajouter un ingrédients</label>
                <InputIngredients 
                    handleInputChange={(ingrédients) => handleInputChange({ target: { name: "ingredients", value: ingrédients } })}
                    ingredientState={formData.ingredients}
                />
            </div>
            <div className="form-group">
                <label htmlFor="instructions">Instructions</label>
                <TextEditor 
                handleInputChange={(instructions) => handleInputChange({ target: { name: "instructions", value: instructions } })}
                textState={formData.instructions}
                />
            </div>
            <div className="form-group">
                <label htmlFor="season">Saison de la recette</label>
                <select
                    id="season"
                    name="season"
                    value={formData.season}
                    onChange={handleInputChange}
                >
                    <option value="">Sélectionner une saison</option>
                    <option value="printemps">Printemps</option>
                    <option value="été">Été</option>
                    <option value="automne">Automne</option>
                    <option value="hiver">Hiver</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="difficulty">Difficulté</label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                >
                    <option value="">Sélectionner une difficulté</option>
                    <option value="facile">Facile</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="difficile">Difficile</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="duration">Durée (en minutes)</label>
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="tags">Tags (pour la recherche)</label>
                <TagsInput
                value={formData.tags}
                onChange={(tags) => handleInputChange({ target: { name: "tags", value: tags } })}
                name="tags"
                placeHolder="Ajouter des tags pour votre recette"
                />
            </div>
            <input type="submit" value="Ajouter la recette"/>
        </form>
    </main>
}

export default RecipeForm;