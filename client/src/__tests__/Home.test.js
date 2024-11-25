import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/StorePage/Home';

//Tests for the Home Component
describe('Home', () => {
    beforeEach(() => {
        // Reset mocks before each test
        require('react-redux').useSelector.mockReset();
    });

    test('renders the homepage with title, text body, categories, category descriptions and carousels', () => {
        // Mock the useSelector to return the necessary data
        require('react-redux').useSelector.mockReturnValue({
        products: {
            Laptops: [
            { name: "Dell XPS 13", description: "13.4-inch FHD+ laptop", price: 999.99, category: "Laptops", image: "dell_xps_13.jpg" }
            ],
            Smartphones: [
            { name: "iPhone 13 Pro", description: "6.1-inch OLED display", price: 999.99, category: "Smartphones", image: "iphone_13_pro.jpg" }
            ],
            Tablets: [
            { name: "iPad Pro 12.9", description: "12.9-inch Liquid Retina display", price: 1099.99, category: "Tablets", image: "ipad_pro_12.9.jpg" }
            ],
            Headphones: [
            { name: "Sony WH-1000XM4", description: "Noise-canceling headphones", price: 348.00, category: "Headphones", image: "sony_wh1000xm4.jpg" }
            ],
            Accessories: [
            { name: "Apple AirPods Pro", description: "In-ear wireless earbuds", price: 249.99, category: "Accessories", image: "airpods_pro.jpg" }
            ],
        },
        });
    
        render(<Home />);
    
        //Check that the store name is displayed
        expect(screen.getByText('VSB Electronics')).toBeInTheDocument();
        expect(screen.getByText('VSB Electronics is your one-stop online store for all things tech. Whether you\'re looking for a new laptop, smartphone, tablet, or accessories, we have a wide range of products to fit your needs. With unbeatable prices and a smooth shopping experience, VSB Electronics ensures that you get the best deals on the latest gadgets.')).toBeInTheDocument();
    
        //Check that the categories are displayed
        expect(screen.getByText('Laptops')).toBeInTheDocument();
        expect(screen.getByText('Smartphones')).toBeInTheDocument();
        expect(screen.getByText('Tablets')).toBeInTheDocument();
        expect(screen.getByText('Headphones')).toBeInTheDocument();
        expect(screen.getByText('Accessories')).toBeInTheDocument();
    
        //Check that descriptions are displayed for each category
        expect(screen.getByText('Discover powerful laptops for work, gaming, and personal use. Get the latest features in sleek designs.')).toBeInTheDocument();
        expect(screen.getByText('Explore a wide range of smartphones with cutting-edge technology to keep you connected.')).toBeInTheDocument();
        expect(screen.getByText('Find versatile tablets perfect for entertainment, work, and creativity.')).toBeInTheDocument();
        expect(screen.getByText('Immerse yourself in high-quality sound with our selection of headphones. Perfect for music, gaming, and work.')).toBeInTheDocument();
        expect(screen.getByText('Complete your tech setup with our range of accessories, including chargers, cases, and more.')).toBeInTheDocument();

        // Check that the carousel contains the correct images for Laptops
        const laptopImages = screen.getAllByRole('img', { name: /Laptops Preview/i });
        expect(laptopImages[0]).toHaveAttribute('src', 'http://localhost:5000/products/dell_xps_13.jpg');

        // Check that the carousel contains the correct images for Smartphones
        const smartphoneImages = screen.getAllByRole('img', { name: /Smartphones Preview/i });
        expect(smartphoneImages[0]).toHaveAttribute('src', 'http://localhost:5000/products/iphone_13_pro.jpg');

        // Check that the carousel contains the correct images for Tablets
        const tabletImages = screen.getAllByRole('img', { name: /Tablets Preview/i });
        expect(tabletImages[0]).toHaveAttribute('src', 'http://localhost:5000/products/ipad_pro_12.9.jpg');

        // Check that the carousel contains the correct images for Headphones
        const headphoneImages = screen.getAllByRole('img', { name: /Headphones Preview/i });
        expect(headphoneImages[0]).toHaveAttribute('src', 'http://localhost:5000/products/sony_wh1000xm4.jpg');

        // Check that the carousel contains the correct images for Accessories
        const accessoryImages = screen.getAllByRole('img', { name: /Accessories Preview/i });
        expect(accessoryImages[0]).toHaveAttribute('src', 'http://localhost:5000/products/airpods_pro.jpg');
    });
});