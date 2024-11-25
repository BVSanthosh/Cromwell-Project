import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../components/StorePage/NavBar';

//Tests for the NavBar Component
describe('NavBar', () => {
  const mockOnNavigate = jest.fn();
  const mockOnCartClick = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    require('react-redux').useSelector.mockReset();
  });

  test('renders the navigation buttons and store name', () => {
    // Mock the useSelector to return the necessary data
    require('react-redux').useSelector.mockReturnValueOnce({
      products: {
        laptops: [
          { name: "Dell XPS 13", description: "13.4-inch FHD+ laptop", price: 999.99, category: "Laptops", image: "laptops/dell_xps_13.jpg" }
        ],
        smartphones: [
          { name: "iPhone 13 Pro", description: "6.1-inch OLED display", price: 999.99, category: "Smartphones", image: "smartphones/iphone_13_pro.jpg" }
        ],
        tablets: [
          { name: "iPad Pro 12.9", description: "12.9-inch Liquid Retina display", price: 1099.99, category: "Tablets", image: "tablets/ipad_pro_12.9.jpg" }
        ],
        headphones: [
          { name: "Sony WH-1000XM4", description: "Noise-canceling headphones", price: 348.00, category: "Headphones", image: "headphones/sony_wh1000xm4.jpg" }
        ],
        accessories: [
          { name: "Apple AirPods Pro", description: "In-ear wireless earbuds", price: 249.99, category: "Accessories", image: "accessories/airpods_pro.jpg" }
        ],
      },
      basket: { totalItems: 5 },
    });

    render(
      <NavBar onNavigate={mockOnNavigate} onCartClick={mockOnCartClick} />
    );

    expect(screen.getByText('VSB Electronics')).toBeInTheDocument();  // Check that the store name is displayed
    expect(screen.getByText('Home')).toBeInTheDocument();  // Check that the 'Home' button is rendered
  });

  test('clicking the Home button triggers onNavigate function', () => {
    require('react-redux').useSelector.mockReturnValueOnce({
      products: {
        laptops: [
          { name: "Dell XPS 13", description: "13.4-inch FHD+ laptop", price: 999.99, category: "Laptops", image: "laptops/dell_xps_13.jpg" }
        ],
        smartphones: [
          { name: "iPhone 13 Pro", description: "6.1-inch OLED display", price: 999.99, category: "Smartphones", image: "smartphones/iphone_13_pro.jpg" }
        ],
        tablets: [
          { name: "iPad Pro 12.9", description: "12.9-inch Liquid Retina display", price: 1099.99, category: "Tablets", image: "tablets/ipad_pro_12.9.jpg" }
        ],
        headphones: [
          { name: "Sony WH-1000XM4", description: "Noise-canceling headphones", price: 348.00, category: "Headphones", image: "headphones/sony_wh1000xm4.jpg" }
        ],
        accessories: [
          { name: "Apple AirPods Pro", description: "In-ear wireless earbuds", price: 249.99, category: "Accessories", image: "accessories/airpods_pro.jpg" }
        ],
      },
      basket: { totalItems: 5 },
    });

    render(
      <NavBar onNavigate={mockOnNavigate} onCartClick={mockOnCartClick} />
    );

    //Click on the 'Home' button and ensure it triggers onNavigate with 'home'
    fireEvent.click(screen.getByText('Home'));
    expect(mockOnNavigate).toHaveBeenCalledWith('home');
  });

  test('clicking the cart button triggers onCartClick function', () => {
    require('react-redux').useSelector.mockReturnValueOnce({
      products: {
        laptops: [
          { name: "Dell XPS 13", description: "13.4-inch FHD+ laptop", price: 999.99, category: "Laptops", image: "laptops/dell_xps_13.jpg" }
        ],
        smartphones: [
          { name: "iPhone 13 Pro", description: "6.1-inch OLED display", price: 999.99, category: "Smartphones", image: "smartphones/iphone_13_pro.jpg" }
        ],
        tablets: [
          { name: "iPad Pro 12.9", description: "12.9-inch Liquid Retina display", price: 1099.99, category: "Tablets", image: "tablets/ipad_pro_12.9.jpg" }
        ],
        headphones: [
          { name: "Sony WH-1000XM4", description: "Noise-canceling headphones", price: 348.00, category: "Headphones", image: "headphones/sony_wh1000xm4.jpg" }
        ],
        accessories: [
          { name: "Apple AirPods Pro", description: "In-ear wireless earbuds", price: 249.99, category: "Accessories", image: "accessories/airpods_pro.jpg" }
        ],
      },
      basket: { totalItems: 5 }, 
    });

    render(
      <NavBar onNavigate={mockOnNavigate} onCartClick={mockOnCartClick} />
    );

    //Click the cart icon and ensure it triggers onCartClick
    fireEvent.click(screen.getByTestId('cart-button'));
    expect(mockOnCartClick).toHaveBeenCalled();
  });
});
