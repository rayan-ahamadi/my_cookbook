import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import HomePage from './pages/HomePage/HomePage' 
import Register from './pages/Register/Register'

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
