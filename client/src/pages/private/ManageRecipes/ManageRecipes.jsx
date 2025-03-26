import RecipeList from './components/RecipeList/RecipeList'; // Sous-page de ManageRecipes
import RecipeForm from './components/RecipeForm/RecipeForm'; // Sous-page de ManageRecipes
import Header from '../../../components/Header/Header';
import PrivateNavbar from '../../../components/PrivateNavbar/PrivateNavbar';
import { Routes, Route } from 'react-router-dom';
import './ManageRecipes.css';
 

function ManageRecipes() {
  return (
    <>
    <Header />
      <main className='back-office'>
        <PrivateNavbar />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/new" element={<RecipeForm />} />
          <Route path="/edit/:id" element={<RecipeForm />} />
        </Routes>
      </main>
    </>
  );
}

export default ManageRecipes;