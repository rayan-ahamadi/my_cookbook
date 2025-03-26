import { Link } from 'react-router-dom';
import './PrivateNavbar.css';


function PrivateNavbar(){
    return(
        <nav className='private-navbar'>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/profile">Profil</Link></li>
                <li><Link to="/my-recipes">Mes Recettes</Link></li>
                <li><Link to="/logout">Déconnexion</Link></li>
            </ul>
        </nav>
    )
}

export default PrivateNavbar;