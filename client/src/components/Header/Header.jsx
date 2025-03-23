import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/icon.png";
import Searchbar from "../Searchbar/Searchbar";

function Header() {
  const [scroll, setScroll] = useState(false);

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
            <Link to="/recipes">Recettes</Link>
          </li>
          <li>
            <Searchbar/>
          </li>
        </ul>
      </nav>
      <section className="user-options">
        <button>Se connecter</button>
        <button>S'inscrire</button>
      </section>
    </header>
  );
}

export default Header;