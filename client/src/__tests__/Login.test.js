import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from '../components/AuthPage/Login';  

//Tests for the Login Component
describe('Login Component', () => {
    let navigate;

    beforeEach(() => {
        navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

  test('renders login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // Check if elements like title and buttons are in the document
    expect(screen.getByTestId('login-title')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  test('shows error message when login fails', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: false } });  //Mock axios.post to simulate a failed login

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByTestId('login-button'));

    const errorMessage = await screen.findByText(/Login failed. Please check your email and password./i);
    expect(errorMessage).toBeInTheDocument();  //Check if the error message appears
  });

  test('navigates to landing page after successful login', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/landing'));  //Assert that the navigate function was called with the landing page
  });

  test('navigates to signup page when "Sign Up" link is clicked', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const signupLink = screen.getByTestId('signup-link');
    expect(signupLink).toHaveAttribute('href', '/signup');   //Assert that the navigate function was called with the signup page
  });
});
