import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import recipeReducer from './slices/recipeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    recipe: recipeReducer,
  }
});

export default store;

