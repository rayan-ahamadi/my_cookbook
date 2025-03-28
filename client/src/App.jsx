import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/public/HomePage/HomePage' 
import Register from './pages/public/Auth/components/Register/Register'
import Login from './pages/public/Auth/components/Login/Login'
import Auth from './pages/public/Auth/Auth'
import ManageRecipes from './pages/private/ManageRecipes/ManageRecipes'

function App() {
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
