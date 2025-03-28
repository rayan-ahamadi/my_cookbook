import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, removeRecipe} from "../../../../../redux/actions/recipeActions";
import { useEffect } from "react";
import {Link} from 'react-router-dom';
import './RecipeList.css';


function RecipeList() {
    const recipes = useSelector(state => state.recipe.recipes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch,recipes]);

    const handleDelete = (id) => {
        if (confirm("Voulez vous vraiment supprimer cette recette ?")){
            dispatch(removeRecipe(id));
        }
    }


    return <section className="recipe-list">
        <button>
            <Link to={{pathname:"./new"}}>Ajouter une recette</Link>
        </button>
        <h2>Liste de vos recettes</h2>
        <ul>
            {recipes && recipes.length > 0 ? recipes.map(recipe => 
            <li key={recipe._id}>
                {recipe.title} &nbsp;
                <span>
                    <Link to={`./edit/${recipe._id}`}><button>Modifier</button></Link>&nbsp;
                    <button onClick={() => handleDelete(recipe._id)}>Supprimer</button>&nbsp;
                </span>
            </li>) : <p>Vous n'avez encore aucune recette</p>}
        </ul>
    </section>
}

export default RecipeList;