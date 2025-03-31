import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/icon.png";
import Searchbar from "../Searchbar/Searchbar";

function Header() {
  const [scroll, setScroll] = useState(false);
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={scroll ? 'scrolled' : ''}>
      <h1>
        <img src={logo} alt="MyCookBook" />
        myCookBook
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/explore">Recettes</Link>
          </li>
          <li>
            <Searchbar/>
          </li>
        </ul>
      </nav>
      <section className="user-options">
        {!user && (
          <>
          <button><Link to="/login">Se connecter</Link></button>
          <button><Link to="/register">S'inscrire</Link></button>
          </>)
          || 
          (<Link to="./dashboard/my-recipes">
            <button className="user-button">
              <img src={"http://localhost:5000" + '/images/avatar/' + user.avatar} alt="Photo de profil" />
              <span>{user.username}</span>
            </button>
          </Link>)
        }
      </section>
    </header>
  );
}

export default Header;