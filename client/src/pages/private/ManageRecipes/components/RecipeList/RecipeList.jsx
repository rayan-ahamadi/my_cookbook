import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../../../../redux/slices/recipeSlice";
import { useEffect } from "react";
import {Link} from 'react-router-dom';
import './RecipeList.css';


function RecipeList() {
    const recipes = useSelector(state => state.recipe.recipes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch,recipes]);

    return <section className="recipe-list">
        <button>
            <Link to={{pathname:"./new"}}>Ajouter une recette</Link>
        </button>
        <h2>Liste de vos recettes</h2>
        <ul>
            {recipes && recipes.length > 0 ? recipes.map(recipe => <li key={recipe._id}>{recipe.title}</li>) : <p>No recipes found</p>}
        </ul>
    </section>
}

export default RecipeList;