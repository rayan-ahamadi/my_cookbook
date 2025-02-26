import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { fetchRecipeBySeason } from "../../redux/slices/recipeSlice";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

function HomePage(){
  const recipe = useSelector(state => state.recipe.recipes);
  const loading = useSelector(state => state.recipe.loading);
  const dispatch = useDispatch();

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
    dispatch(fetchRecipeBySeason(currentSeason));
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
      <>
      <Header />
      <main>

      </main>
      <Footer />
      </>   
  );

}

export default HomePage;