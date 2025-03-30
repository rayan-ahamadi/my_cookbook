import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchRecipeSlug } from "../../../redux/actions/recipeActions";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Comments from "./components/comments/comments";
import "./RecipePage.css";



function RecipePage() {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const recipe = useSelector((state) => state.recipe.currentRecipe);
    const loading = useSelector((state) => state.loading);
    const navigate = useNavigate();

    useEffect(() => {
        if (!slug) navigate("/");
        dispatch(fetchRecipeSlug(slug));
    }, [dispatch, slug, navigate]);
    
    const error = useSelector((state) => state.error);

    return (
        <>
            <Header />
            <main className="recipe-page">
                {loading && <p>Chargement...</p>}
                {error && <p>Erreur : {error}</p>}
                {recipe && (
                <>
                    <h2>{recipe.title}</h2>
                    <img src={"http://localhost:5000/images/recipe/" + recipe.image} alt={recipe.title} />
                    <p>{recipe.description}</p>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <span className="ingredient-quantity">{ingredient.quantity}</span>
                                <span className="ingredient-unit">{ingredient.unit} </span>
                                <span className="ingredient-name">{ingredient.name}</span>
                                {ingredient.notes && (<span className="ingredient-notes">`{ingredient.notes}`</span>) }
                            </li>
                        ))}
                    </ul>
                    <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
                    <Comments recipeId={recipe._id} />
                </>
                )}
            </main>
            
            <Footer />
        </>
    );

}
export default RecipePage;