import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../../../../hooks/useForm'
import { registerUser } from '../../../../../redux/actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenFancy } from '@fortawesome/free-solid-svg-icons';
import './Register.css';

const Register = () => {
  const initialState = {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    role: '',
    confirmPassword: '',
    avatar: '',
  }
  const error = useSelector(state => state.user.error);
  const dispatch = useDispatch();


  const handleFormSubmit = async (e) => {
    e.preventDefault;
    dispatch(registerUser(formData));
  };

  const handleActiveFormSection = (section) => {
    if (section === 'user-info') {
      if (!formData.name || !formData.surname || !formData.username || !formData.email || !formData.password || formData.password !== formData.confirmPassword) {
        alert("Veuillez remplir tous les champs correctement avant de continuer.");
        return;
      }
    }
    if (section === 'role-info') {
      console.log(formData.role);
      if (!formData.role) {
        alert("Veuillez sélectionner un rôle avant de continuer.");
        return;
      }
    }

    const activeSection = document.querySelector('.form-section.active');
    activeSection.classList.remove('active');
    activeSection.nextElementSibling.classList.add('active');
  } 


  const {formData, handleInputChange, handleSubmit} = useForm(initialState, handleFormSubmit);



  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} action="" className="register-form">
        <div className="form-section active" id='user-info'>
          <h2>Formulaire d'inscription</h2>
          <div className="form-group">
            <label>Prénom</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Nom</label>
            <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Pseudo</label>
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Adresse Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required minLength="8" />
          </div>
          <div className="form-group">
            <label>Confirmation du mot de passe</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
          </div>

          <button type="button" className="register-button" onClick={() => handleActiveFormSection("user-info")}>Continuer</button>
        </div>
        <div className="form-section" id='role-info'>
          <h2>Choisissez votre role</h2>
          <div className="form-group">
            <div className="role-options">
              <input type="radio" name="role" id="role-user" value="user" onChange={handleInputChange}/>
              <label htmlFor="role-user">
                <FontAwesomeIcon icon={faUser} />
                <p>Utilisateur</p> 
              </label>

              <input type="radio" name="role" id="role-author" value="author" onChange={handleInputChange}/>  
              <label htmlFor="role-author">
                <FontAwesomeIcon icon={faPenFancy} />
                <p>Auteur</p> 
              </label>             
            </div>
          </div>

          <button type="button" className="register-button" onClick={() => handleActiveFormSection("role-info")}>Continuer</button>
        </div>
        <div className="form-section" id='avatar-info'>
          <h2>Définissez votre photo de profil</h2>
          {formData.avatar && (
            <div className="avatar-preview">
              <img src={URL.createObjectURL(formData.avatar)} alt="Avatar Preview" className="avatar-preview" />
            </div>
          ) || (
            <div className="avatar-preview">
              <img src="http://localhost:5000/images/avatar/default.png'" alt="Avatar Preview" className="avatar-preview" />
            </div>
          )}
          <div className="form-group">
            <input type="file" name="avatar" onChange={handleInputChange} />
          </div>
          <input type="submit" className="register-button" value="S'inscrire" />
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
