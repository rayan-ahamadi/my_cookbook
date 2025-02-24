import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import recipeReducer from './slices/recipeSlice';
import commentReducer from './slices/commentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    recipe: recipeReducer,
    commentReducer: commentReducer
  }
});

export default store;

