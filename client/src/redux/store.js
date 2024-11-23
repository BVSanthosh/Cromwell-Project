import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import basketReducer from './basketSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer
  }
});

export default store;
