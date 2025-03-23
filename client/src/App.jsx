import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/public/HomePage/HomePage' 
import Register from './pages/public/Register/Register'
import ManageRecipes from './pages/private/ManageRecipes/ManageRecipes'

function App() {
  return (
    <Router> 
      <Routes>
        {/* Routes Publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />

        {/* Routes Privées */}  
        <Route path="/dashboard/my-recipes/*" element={<ManageRecipes />} />
      </Routes>
    </Router>
  )
}

export default App
