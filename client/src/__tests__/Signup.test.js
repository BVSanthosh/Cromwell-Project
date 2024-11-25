import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Signup from '../components/AuthPage/Signup';

//Tests for the Signup Component
describe('Signup Component', () => {
    let navigate;

    beforeEach(() => {
        navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
  test('renders signup form', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    //Check if form elements are rendered
    expect(screen.getByTestId('signup-title')).toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('newpassword-input')).toBeInTheDocument();
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
  });

  test('displays error message on signup failure', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { success: false } }
    });

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test1234!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Test1234!' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    const errorMessage = await screen.findByText(/An error occurred. Please try again later./i);
    expect(errorMessage).toBeInTheDocument();  //Check if the error message appears
  });

  test('navigates to login page on successful signup', async () => {
    axios.post.mockResolvedValueOnce({
      data: { success: true }
    });

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test1234!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Test1234!' } });

    fireEvent.click(screen.getByTestId('signup-button'));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/login'));  //Assert that the navigate function was called with the landing page
  });

  test('displays error message when signup fails due to server error', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test1234!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Test1234!' } });


    fireEvent.click(screen.getByTestId('signup-button'));

    const errorMessage = await screen.findByText(/An error occurred. Please try again later./i);
    expect(errorMessage).toBeInTheDocument();  //Check if the error message appears
  });

  test('navigates to login page when "Log In" link is clicked', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const signupLink = screen.getByTestId('login-link');
    expect(signupLink).toHaveAttribute('href', '/login');   //Assert that the navigate function was called with the login page
  });
});
