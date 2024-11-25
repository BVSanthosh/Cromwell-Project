import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from '../components/StorePage/Cart';

//Tests for the Cart Component
describe('Cart Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders cart items and total price', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        basket: {
          items: [
            { _id: '1', name: 'Laptop', price: 999.99, quantity: 2 },
            { _id: '2', name: 'Headphones', price: 199.99, quantity: 1 },
          ],
          totalPrice: 2199.97,
        },
      })
    );

    render(<Cart />);

    //Check that cart items are rendered
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Price: $1999.98')).toBeInTheDocument();
    expect(screen.getByText('Headphones')).toBeInTheDocument();
    expect(screen.getByText('Price: $199.99')).toBeInTheDocument();

    //Check total price
    expect(screen.getByText('Total: $2199.97')).toBeInTheDocument();
  });

  test('handles quantity increment', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        basket: {
          items: [{ _id: '1', name: 'Laptop', price: 999.99, quantity: 2 }],
          totalPrice: 1999.98,
        },
      })
    );

    render(<Cart />);

    const incrementButton = screen.getByLabelText('increase quantity');
    fireEvent.click(incrementButton);

    //Check that the dispatch function is called with the id and incremented quantity
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'basket/updateQuantity',
      payload: { id: '1', quantity: 3 },
    });
  });

  test('handles quantity decrement', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        basket: {
          items: [{ _id: '1', name: 'Laptop', price: 999.99, quantity: 2 }],
          totalPrice: 1999.98,
        },
      })
    );

    render(<Cart />);

    const decrementButton = screen.getByLabelText('decrease quantity');
    fireEvent.click(decrementButton);

    //Check that the dispatch function is called with the id and decremented quantity
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'basket/updateQuantity',
      payload: { id: '1', quantity: 1 },
    });
  });

  test('does not decrement quantity below 1', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        basket: {
          items: [{ _id: '1', name: 'Laptop', price: 999.99, quantity: 1 }],
          totalPrice: 999.99,
        },
      })
    );

    render(<Cart />);

    const decrementButton = screen.getByLabelText('decrease quantity');
    fireEvent.click(decrementButton);

    //Check that the dispatch function is not called
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('removes item from cart', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        basket: {
          items: [{ _id: '1', name: 'Laptop', price: 999.99, quantity: 2 }],
          totalPrice: 1999.98,
        },
      })
    );

    render(<Cart />);

    const removeButton = screen.getByLabelText('remove item');
    fireEvent.click(removeButton);

    //Check that the dispatch function is called with the id of the removed item 
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'basket/removeFromBasket',
      payload: '1',
    });
  });

  test('renders empty cart message', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        basket: {
          items: [],
          totalPrice: 0,
        },
      })
    );

    render(<Cart />);

    //Check that the text display is correct
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    expect(screen.getByText('Total: $0.00')).toBeInTheDocument();
  });
});
