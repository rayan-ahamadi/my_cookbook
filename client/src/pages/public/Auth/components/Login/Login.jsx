import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../../../../hooks/useForm'
import { loginUser } from '../../../../../redux/actions/userActions';
import './Login.css';

const Login = () => {
  const initialState = {
    email: '',
    password: '',
  }
  const error = useSelector(state => state.user.error);
  const dispatch = useDispatch();


  const handleFormSubmit = async (e) => {
    e.preventDefault;
    dispatch(loginUser(formData));
  };


  const {formData, handleInputChange, handleSubmit} = useForm(initialState, handleFormSubmit);


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} action="" className="login-form">
        <div className="form-section active" id='user-info'>
          <h2>Formulaire de connexion</h2>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <input type="submit" className="login-button" value="S'inscrire" />
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
