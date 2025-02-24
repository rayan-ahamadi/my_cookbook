import React from "react";
import "./Header.css";

function Header() {
  return (
    <header>
      <h1>MyCookBook</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>Explorer</li>
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