import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../components/StorePage/ProductList';

//Tests for the ProductList Component
describe('ProductList', () => {
  test('renders a list of products correctly', () => {
    const laptopProducts = [
      { id: 1, name: "Dell XPS 13", description: "13.4-inch FHD+ laptop", price: 999.99, category: "Laptops", image: "dell_xps_13.jpg" },
      { id: 2, name: "MacBook Pro", description: "14-inch M1 Pro laptop", price: 1999.99, category: "Laptops", image: "macbook_pro.jpg" },
      { id: 3, name: "HP Spectre x360", description: "13.5-inch 2-in-1 laptop", price: 1299.99, category: "Laptops", image: "hp_spectre_x360.jpg" },
    ];

    render(
      <ProductList
        category="Laptops"
        description="Explore our latest collection of laptops."
        products={laptopProducts}
      />
    );

    //Check category title and description
    expect(screen.getByText('Laptops')).toBeInTheDocument();
    expect(screen.getByText('Explore our latest collection of laptops.')).toBeInTheDocument();

    //Verify all products are rendered with their details
    laptopProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });

    //Verify the product images are rendered
    laptopProducts.forEach((product) => {
      const image = screen.getByAltText(product.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', `http://localhost:5000/products/${product.image}`);
    });
  });

  test('renders message when no products are available', () => {
    render(
      <ProductList
        category="Laptops"
        description="Explore our latest collection of laptops."
        products={[]}
      />
    );

    //Check that the "no products available" message is displayed
    expect(screen.getByText('No products available in this category.')).toBeInTheDocument();
  });
});
