import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the products slice
const initialState = {
  products: {} 
};

//Create a slice for managing product-related state
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    //Define a reducer to set products in the state
    setProducts: (state, action) => {
      const products = action.payload;
      const productMap = {};

      products.forEach((product) => {
        const category = product.category; 
        if (!productMap[category]) {
          productMap[category] = [];
        }
        productMap[category].push(product);
      });

      state.products = productMap;
    }
  }
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;