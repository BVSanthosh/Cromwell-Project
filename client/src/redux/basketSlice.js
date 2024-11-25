import { createSlice } from '@reduxjs/toolkit';

//Define the initial state for the basket slice
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

//Create a slice for managing basket-related state
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    //Reducer to add a product to the basket
    addToBasket: (state, action) => {
      const product = action.payload;

      const existingProduct = state.items.find(item => item._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalItems += 1;
      state.totalPrice += product.price;
    },

    //Reducer to remove a product from the basket
    removeFromBasket: (state, action) => {
      const productId = action.payload;

      const productToRemove = state.items.find(item => item._id === productId);

      if (productToRemove) {
        state.totalItems -= productToRemove.quantity;
        state.totalPrice -= productToRemove.price * productToRemove.quantity;

        state.items = state.items.filter(item => item._id !== productId);
      }
    },

    //Reducer to update the quantity of a product in the basket
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const product = state.items.find(item => item._id === id);

      if (product) {
        const quantityDifference = quantity - product.quantity;
        state.totalItems += quantityDifference;
        state.totalPrice += quantityDifference * product.price;

        product.quantity = quantity;
      }
    },

    clearBasket: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;