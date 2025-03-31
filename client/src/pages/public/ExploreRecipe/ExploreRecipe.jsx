import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchRecipePaginate, fetchSearchRecipesPaginate } from "../../../redux/actions/recipeActions";
import {setCurrentPage, resetCurrentPage} from "../../../redux/slices/recipeSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./ExploreRecipe.css";




function ExploreRecipe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useParams();
    const recipes = useSelector((state) => state.recipe.recipes);
    const totalPages = useSelector((state) => state.recipe.totalPages);
    const currentPage = useSelector((state) => state.recipe.currentPage);

    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);
    

    useEffect(() => {
        if (search) {
            dispatch(fetchSearchRecipesPaginate(search, currentPage));
        } else {
            dispatch(fetchRecipePaginate(currentPage));
        }
    }, [dispatch, search, currentPage]);

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
        if (search) {
            dispatch(fetchSearchRecipesPaginate(search, page));
        } else {
            dispatch(fetchRecipePaginate(page));
        }
    };

    const handleResetPage = () => {
        dispatch(resetCurrentPage());
        if (search) {
            dispatch(fetchSearchRecipesPaginate(search, 0));
        } else {
            dispatch(fetchRecipePaginate(0));
        }
    };

    return (
        <>
            <Header/>
            <main className="explore-recipe">
                {search && <h2>Résultats de recherche pour : {search}</h2>}
                <div className="recipe-card-container">
                    {loading && <p>Chargement...</p>}
                    {error && <p>Erreur : {error}</p>}
                    {recipes && recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <div key={recipe._id} className="recipe-card">
                                <img src={"http://localhost:5000/images/recipe/" + recipe.image} alt={recipe.title} />
                                <h3>{recipe.title}</h3>
                                <p>{recipe.description}</p>
                                <button onClick={() => navigate(`/recipe/${recipe.slug}`)}>Voir la recette</button>
                            </div>
                        ))
                    ) : (
                        <p>Aucune recette trouvée.</p>
                    )}
                </div>
        
                <div className="pagination">
                    {totalPages > 0 ? (
                        Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index)}
                                disabled={currentPage === index}
                            >
                                {index + 1}
                            </button>
                        ))
                    ) : (
                        <button disabled>0</button>
                    )}
                </div>
                      
            </main>
            <Footer/>
        </>
    );
}

export default ExploreRecipe;