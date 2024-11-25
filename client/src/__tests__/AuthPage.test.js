import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthPage from '../components/AuthPage/AuthPage';
import { useNavigate } from 'react-router-dom';

//Tests for the AuthPage Component
describe('AuthPage', () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn(); //Directly mock the navigate function
    useNavigate.mockReturnValue(navigate); //Return the mocked function
  });
  
  test('renders AuthPage correctly with the text content', () => {
    render(
      <Router>
        <AuthPage />
      </Router>
    );

    //Check if the text elements and butons are present
    expect(screen.getByText(/Welcome to VSB Electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover the latest tech gadgets and electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  test('navigates to signup page when "Sign Up" button is clicked', () => {
    render(
      <Router>
        <AuthPage />
      </Router>
    );

    const signupButton = screen.getByText(/Sign Up/i);

    fireEvent.click(signupButton);

    expect(navigate).toHaveBeenCalledWith('/signup');  //Assert that the navigate function was called with the signup path
  });
  
  test('navigates to login page when "Log In" button is clicked', () => {
    render(
      <Router>
        <AuthPage />
      </Router>
    );

    const loginButton = screen.getByText(/Log In/i);

    fireEvent.click(loginButton); 

    expect(navigate).toHaveBeenCalledWith('/login'); //Assert that the navigate function was called with the login path
  });
});
