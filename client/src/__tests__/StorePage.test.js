import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import StorePage from '../components/StorePage/StorePage';

//Tests for the StorePage Component
describe('StorePage', () => { 
    test('renders StorePage correctly', async () => {
        useSelector.mockImplementation((selector) =>
            selector({
              products: { products: {} },  
              basket: { items: [] },  
            })
        );

        render(<StorePage />);

        expect(await screen.findByText('Home')).toBeInTheDocument();  //Check for the NavBar component
        expect(await screen.findByText('VSB Electronics is your one-stop online store for all things tech. Whether you\'re looking for a new laptop, smartphone, tablet, or accessories, we have a wide range of products to fit your needs. With unbeatable prices and a smooth shopping experience, VSB Electronics ensures that you get the best deals on the latest gadgets.')).toBeInTheDocument();  //Check for the Home component
    });
});
