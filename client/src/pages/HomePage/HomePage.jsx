import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { fetchRecipeBySeason } from "../../redux/slices/recipeSlice";
import Header from "../../components/Header/Header";

function HomePage(){
  const recipe = useSelector(state => state.recipe.recipes);
  const loading = useSelector(state => state.recipe.loading);
  const dispatch = useDispatch();
  const [season, setSeason] = useState("");

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) {
      return "printemps";
    } else if (month >= 6 && month <= 8) {
      return "été";
    } else if (month >= 9 && month <= 11) {
      return "automne";
    } else {
      return "hiver";
    }
  };

  useEffect(() => {
    const currentSeason = getCurrentSeason();
    setSeason(currentSeason);
    dispatch(fetchRecipeBySeason(currentSeason));
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="main-content">
      <Header />
      {/* <h2>Season: {season}</h2>
      <h3>Recipes</h3>
      <ul>
        {recipe.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul> */}
    </main>
  );

}

export default HomePage;