import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/icon.png";

function Header() {
  return (
    <header>
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
            <input type="text" placeholder="Rechercher" />
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