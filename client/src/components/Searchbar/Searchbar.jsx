import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { fetchRecipeBySearch } from '../../redux/actions/recipeActions';
import './Searchbar.css';


function Searchbar() {
  const searchSuggestions = useSelector((state) => state.recipe.searchSuggestions);
  const dispatch = useDispatch();
  const inputSearch = useRef(null);
  const suggestionsContainer = useRef(null); 
  const [search, setSearch] = useState('');
  
  const handleMouseOver = () => {
    inputSearch.current.classList.add('hover');
  }

  const handleMouseOut = () => {
    if (search.length <= 1) {
      inputSearch.current.classList.remove('hover')
      setSearch('');
    }
  }

  useEffect(() => {
    if (search.length > 4) {
      dispatch(fetchRecipeBySearch(search));
      suggestionsContainer.current.classList.add('results');
      setTimeout(() => {
        suggestionsContainer.current.classList.add('show');
      }, 500);
      inputSearch.current.parentNode.classList.add('searched');
    } else {
      setTimeout(() => {
        suggestionsContainer.current.classList.remove('show');
      }, 500);
      suggestionsContainer.current.classList.remove('results');
      inputSearch.current.parentNode.classList.remove('searched');
    }
  }, [search]);

  return (
    <div className='searchbar-container' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className="input-container">
        <input type="search" className='searchbar' placeholder="Rechercher une recette" ref={inputSearch} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <span className='search-icon' >
        <FontAwesomeIcon icon={faMagnifyingGlass}/>
      </span>
      <nav className='search-suggestions' ref={suggestionsContainer}>
        <ul>
          {searchSuggestions && searchSuggestions.length > 0 ? (
            searchSuggestions.map((recipe) => (
              <li key={recipe._id}>
                <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
              </li>
            ))
          ) : (
            <li>Pas de résultat pour votre recherche</li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Searchbar