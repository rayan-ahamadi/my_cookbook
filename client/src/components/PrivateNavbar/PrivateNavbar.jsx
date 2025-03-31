import { Link, useNavigate } from 'react-router-dom';
import './PrivateNavbar.css';
import { logout } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';


function PrivateNavbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
            // Si l'utilisateur confirme, on le déconnecte
            dispatch(logout());
            // On le redirige vers la page d'accueil
            navigate('/');
        }
    }


    return(
        <nav className='private-navbar'>
            <ul>
                <li><Link to="../dashboard">Dashboard</Link></li>
                <li><Link to="../dashboard/profile">Profil</Link></li>
                <li><Link to="../dashboard/my-recipes">Mes Recettes</Link></li>
                <li><span onClick={handleLogout} >Déconnexion</span></li>
            </ul>
        </nav>
    )
}

export default PrivateNavbar;