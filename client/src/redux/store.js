import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import basketReducer from './basketSlice';

//Configure the Redux store
//This store holds the state of the application and combines the products and basket reducers
const store = configureStore({
  reducer: {
    products: productsReducer,  //Associate the productsReducer with the 'products' state slice
    basket: basketReducer  //Associate the basketReducer with the 'basket' state slice
  }
});

export default store;