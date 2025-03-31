import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/public/HomePage/HomePage' 
import Register from './pages/public/Auth/components/Register/Register'
import Login from './pages/public/Auth/components/Login/Login'
import Auth from './pages/public/Auth/Auth'
import ManageRecipes from './pages/private/ManageRecipes/ManageRecipes'
import RecipePage from './pages/public/RecipePage/RecipePage'
import ExploreRecipe from './pages/public/ExploreRecipe/ExploreRecipe'
import { useDispatch } from 'react-redux'
import { refreshUser } from './redux/actions/userActions'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      // Si l'utilisateur est connecté, on vérifie son token et on le rafraichit
      dispatch(refreshUser());
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
        <Route path="/recipe/:slug" element={<RecipePage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/explore" element={<ExploreRecipe />} />
        <Route path="/explore/:search" element={<ExploreRecipe />} />

        {/* Routes Privées */}  
        <Route path="/dashboard/my-recipes/*" element={<ManageRecipes />} />
      </Routes>
    </Router>
  )
}

export default App
