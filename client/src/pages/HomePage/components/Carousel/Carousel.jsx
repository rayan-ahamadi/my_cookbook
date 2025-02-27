import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchRecipeBySeason } from "../../../../redux/slices/recipeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar, faClock, faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Carousel.css";


function Carousel ({ season }) {
  const recipe = useSelector(state => state.recipe.recipes);
  const loading = useSelector(state => state.recipe.loading);
  const dispatch = useDispatch();
  const carouselList = useRef(null);
  const imgsSrc = "http://localhost:5000" + '/images/recipe/';

  useEffect(() => {
    console.log(season);
    dispatch(fetchRecipeBySeason(season));
  }, [dispatch,season]);

  if (loading) {
    return <h2 className="carousel">Loading...</h2>;
  }

  const handleScroll = (direction) => {
    const scrollWidth = carouselList.current.firstChild.offsetWidth;
    if (direction === 'left') {
      carouselList.current.scrollLeft -= scrollWidth;
    } else {
      carouselList.current.scrollLeft += scrollWidth;
    }
  }

  return (
    <div className="carousel">
      <span className="carousel-arrow left" onClick={() => handleScroll('left')}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </span>  
      <div className="carousel-list" ref={carouselList}>
        {recipe.map((recipe) => (
        <div key={recipe._id} className="recipe-card" style={{ backgroundImage: `url(${imgsSrc + recipe.image})` }}>
          <div className="recipe-card-content">
            <h3>{recipe.title}</h3>
            <div className="stars">
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <p>{recipe.description}</p>
            <div className="infos-row">
              <div className="info">
                <span><FontAwesomeIcon icon={faUser} /></span>
                <span>{recipe.authorName || "inconnu"}</span>
              </div>
              <div className="info">
                <span><FontAwesomeIcon icon={faClock} /></span>
                <span>{recipe.duration} min</span>
              </div>
              <div className="info">
                <span><FontAwesomeIcon icon={faHeart} /></span>
                <span>{recipe.favorites}</span>
              </div>
            </div>
            <br />
            <button className="ctc-recipe">
              <Link to={'recipe/' + recipe.slug}>Consulter la recette</Link>
            </button>
          </div>
        </div>
      ))}
      </div>
      <span className="carousel-arrow right" onClick={() => handleScroll('right')}>
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </div>
  );
}

export default Carousel;