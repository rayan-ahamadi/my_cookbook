import { useSelector } from 'react-redux';
import {useRef} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Searchbar.css';


function Searchbar() {
  // const search = useSelector((state) => state.search);
  const inputSearch = useRef(null);
  

  const handleMouseOver = () => {
    inputSearch.current.classList.toggle('hover')
  }

  const handleMouseOut = () => {
    inputSearch.current.classList.toggle('hover')
  }

  return (
    <div className='searchbar' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <input type="search" className='searchbar' placeholder="Rechercher une recette" ref={inputSearch} />
      <span className='search-icon' >
        <FontAwesomeIcon icon={faMagnifyingGlass}/>
      </span>
    </div>
  );
}

export default Searchbar