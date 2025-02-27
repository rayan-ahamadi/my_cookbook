import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { fetchRecipeBySeason } from "../../redux/slices/recipeSlice";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Carousel from "./components/Carousel/Carousel";
import "./HomePage.css";
import background1 from "../../assets/images/background-1.gif";
import background2 from "../../assets/images/background-2.gif";
import { getRecipeBySeason } from "../../services/api/entities/recipe/fetchRecipe";

function HomePage(){
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
  const [season, setSeason] = useState(getCurrentSeason());

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
      <>
      <Header />
        <main>
          <section className="hero-section" style={{backgroundImage: `url(${background2})`}}>
            <div className="hero-text">
              <h2>Retrouvez Plus De 120 Recettes De Cuisines !</h2>
            </div>
          </section>
          <section className="season-separator">
            <h3>
              Recettes Pour La Saison : {season.charAt(0).toUpperCase() + season.slice(1)}
            </h3>
          </section>
          <section className="carousel-recipes">
            <Carousel season={season} />
          </section>
        </main>
      <Footer />
      </>   
  );

}

export default HomePage;