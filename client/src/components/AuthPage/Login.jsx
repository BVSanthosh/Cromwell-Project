import axios from 'axios';
import { useState } from  'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import { useNavigate, Link} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');  
    const [loginForm, setLoginForm] = useState({    //state for managing the login info
        email: '',
        password: ''
    });

    //event handler for updating the input fields in the form to show user input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //event handler for submitting the login form data to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/user/login', loginForm);  //establishes a http connection to the specified endpoint

            if (response.data.success) {
                console.log('Login successful:', response.data);
                navigate('/landing-page');   //navigates to the form page after successfully logining in
            } else {
                setErrorMessage('Login failed. Please check your email and password.');
            }
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
            setErrorMessage('An error occurred. Please try again later.');
        }
    }

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Paper
                sx={{
                    padding: 3,  
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: 2, 
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Log In
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={loginForm.email}
                                onChange={handleChange}
                                fullWidth
                                error={!!errorMessage}
                                helperText={errorMessage && 'Please enter a valid email'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={loginForm.password}
                                onChange={handleChange}
                                fullWidth
                                error={!!errorMessage}
                                helperText={errorMessage && 'Password is incorrect'}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ width: '100%', marginTop: 2 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{ padding: '12px' }}
                        >
                            Log In
                        </Button>
                    </Box>

                    {errorMessage && (
                        <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
                </form>

                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Login;