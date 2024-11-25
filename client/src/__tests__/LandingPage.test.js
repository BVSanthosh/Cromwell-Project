import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage';


// Tests for the LandingPage Component
describe('LandingPage', () => {
    let navigate;

    beforeEach(() => {
        navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    test('displays loading indicator while fetching user data', () => {
        axios.get.mockResolvedValue({ data: { data: { username: 'John Doe' } } });

        render(
            <Router>
                <LandingPage />
            </Router>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();  //Check if CircularProgress is displayed while loading
    });

    test('displays user data and content after successful fetch', async () => {
        axios.get.mockResolvedValue({ data: { data: { username: 'John Doe' } } });

        render(
            <Router>
                <LandingPage />
            </Router>
        );

        const username = await screen.findByText('Hi John Doe!');
        expect(username).toBeInTheDocument();  //Check if the title exists

        expect(screen.getByText('At VSB Electronics, we bring the latest and most innovative technology right to your fingertips. Whether you\'re looking for high-performance laptops, the newest smartphones, or cutting-edge gadgets, we offer an extensive range of products to cater to your tech needs.')).toBeInTheDocument();  //Check if the text body

        expect(screen.getByText(/Go to Store/i)).toBeInTheDocument();  //Check if the button exists
    });

    test('navigates to the store page after pressing the button', async () => {
        axios.get.mockResolvedValue({ data: { data: { username: 'John Doe' } } });

        render(
        <Router>
            <LandingPage />
        </Router>
        );

        await screen.findByText('Hi John Doe!');
        
        const button = await screen.findByTestId('store-button');

        fireEvent.click(button);

        await waitFor(() => expect(navigate).toHaveBeenCalledWith('/store'));  //Check if the navigation happens to the /store route
    });

    test('displays an error message when user data fetch fails', async () => {
        axios.get.mockRejectedValue(new Error('Failed to fetch user data. Please try again.'));

        render(
        <Router>
            <LandingPage />
        </Router>
        );

        const errorMessage = await screen.findByText('Failed to fetch user data. Please try again.');
        
        expect(errorMessage).toBeInTheDocument();  //Check for the error message to be displayed
    });
});