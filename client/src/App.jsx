import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/public/HomePage/HomePage' 
import Register from './pages/public/Auth/components/Register/Register'
import Login from './pages/public/Auth/components/Login/Login'
import Auth from './pages/public/Auth/Auth'
import ManageRecipes from './pages/private/ManageRecipes/ManageRecipes'
import { useDispatch,useSelector } from 'react-redux'
import { getUser, logout } from "./redux/slices/userSlice";
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch();

  // Si l'utilisateur est connecté, on va chercher ses données
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    if (user) {
      dispatch(getUser());
    }
  }
  , [dispatch]);


  return (
    <Router> 
      <Routes>
        {/* Routes Publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Routes Privées */}  
        <Route path="/dashboard/my-recipes/*" element={<ManageRecipes />} />
      </Routes>
    </Router>
  )
}

export default App
