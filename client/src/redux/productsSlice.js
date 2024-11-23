import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: {} 
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
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