import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import './App.css'
import Register from './components/register'

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
