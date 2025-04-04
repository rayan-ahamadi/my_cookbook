import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchRecipeBySeason } from "../../../../../redux/actions/recipeActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar, faClock, faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Carousel.css";
import PropTypes from 'prop-types';


function Carousel ({ season }) {
  const recipe = useSelector(state => state.recipe.recipes);
  const loading = useSelector(state => state.recipe.loading);
  const dispatch = useDispatch();
  const carouselList = useRef(null);
  const imgsSrc = "http://localhost:5000" + '/images/recipe/';

  useEffect(() => {
    dispatch(fetchRecipeBySeason(season));
  }, [dispatch,season]);

  // pour le infinite scroll
  useEffect(() => {
    if (!carouselList.current || carouselList.current.children.length === 0) return;

    const firstChild = carouselList.current.firstElementChild;
    const lastChild = carouselList.current.lastElementChild;
    const firstChildClone = firstChild.cloneNode(true);
    const lastChildClone = lastChild.cloneNode(true);

    console.log(firstChild, lastChild); 

    if (firstChild && lastChild) {
      carouselList.current.appendChild(firstChildClone);
      carouselList.current.insertBefore(lastChildClone, firstChild);
    }

    carouselList.current.scrollLeft = firstChild?.offsetWidth || 0;
  }, [carouselList.current]);

  if (loading) {
    return <h2 className="carousel">Loading...</h2>;
  }

  const handleScroll = (direction) => {
    const scrollWidth = carouselList.current.firstChild.offsetWidth;
    if (direction === 'left') {
      carouselList.current.scrollBy({
        left: -scrollWidth,
        behavior: 'smooth',
      });
    } else {
      carouselList.current.scrollBy({
        left: scrollWidth,
        behavior
        : 'smooth',
      });
    }

    // infinite scroll
    if (carouselList.current.scrollLeft === 0) {
      carouselList.current.scrollBy({
        left: carouselList.current.scrollWidth - scrollWidth * 2,
        behavior: 'auto',
      })
      carouselList.current.scrollBy({
        left: -scrollWidth,
        behavior: 'smooth',
      })
    }
    if (carouselList.current.scrollLeft === carouselList.current.scrollWidth - scrollWidth) {
      carouselList.current.scrollBy({
        left: -carouselList.current.scrollWidth + scrollWidth * 2,
        behavior: 'auto',
      })
      carouselList.current.scrollBy({
        left: scrollWidth,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="carousel">
      <span className="carousel-arrow left" onClick={() => handleScroll('left')}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </span>  
      <div className="carousel-list" ref={carouselList}>
        {recipe && recipe.map((recipe) => (
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
Carousel.propTypes = {
  season: PropTypes.string.isRequired,
};

export default Carousel;