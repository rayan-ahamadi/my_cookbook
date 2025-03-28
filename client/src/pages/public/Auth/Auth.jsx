import {Link} from 'react-router-dom';
import logo from '../../../assets/images/icon.png';
import './Auth.css';

const Auth = () => {

  return (
    <div className="auth-container">
        <main className="auth-main">
            <h1>
                <img src={logo} alt="MyCookBook" />
                myCookBook
            </h1>
            <h2>Bienvenue !</h2>
            <div className="Auth-buttons">
                <button>
                    <Link to="/login" className="Auth-button">Connexion</Link>
                </button>
                <button>
                    <Link to="/register" className="Auth-button">Inscription</Link>
                </button>
            </div>
        </main> 
    </div>
  );
};

export default Auth;
