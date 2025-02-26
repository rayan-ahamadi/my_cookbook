import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/images/icon.png";

function Footer () {
  return (
    <>
      <footer>
      <h3>
        <img src={logo} alt="MyCookBook" />
        myCookBook
      </h3>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/recipes">Recettes</Link>
          </li>
          <li>
            <Link to="/about">A propos</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <section className="newsletter">
        <p>Recevez les dernières recettes direct
          dans votre boîte mail !</p>
        <form>
          <input type="email" placeholder="Votre email" />
          <button type="submit">S'inscrire</button>
        </form>
      </section>
    </footer>
    <section className="subfooter">
      <p>&copy; 2025 myCookBook. Tous droits réservés.</p>
    </section>
    </>
  );
}

export default Footer;