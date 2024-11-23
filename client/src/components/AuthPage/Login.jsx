import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Tooltip from '@mui/material/Tooltip';  // Import Tooltip component
import * as Yup from 'yup';  // Add Yup for validation

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    // Define validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    // Event handler for submitting the login form data to the server
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/user/login', values);  // Establishes a HTTP connection to the specified endpoint

            if (response.data.success) {
                console.log('Login successful:', response.data);
                navigate('/landing');   // Navigates to the form page after successfully logging in
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
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                padding: 0,
            }}
        >
            <Paper
                sx={{
                    padding: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: 3,
                    boxShadow: 3,
                    border: '1px solid #ddd',
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        marginBottom: 3, 
                    }}
                >
                    Log In
                </Typography>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema} 
                >
                    {({ errors, touched }) => (
                        <Form style={{ width: '100%' }}>
                            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                                <Grid item xs={12}>
                                    <Tooltip
                                        title={errors.email && touched.email ? errors.email : ''}
                                        open={Boolean(errors.email) && touched.email} 
                                    >
                                        <Field
                                            name="email"
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            as={TextField}
                                            error={!!(errors.email && touched.email)}
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <Tooltip
                                        title={errors.password && touched.password ? errors.password : ''}
                                        open={Boolean(errors.password) && touched.password} 
                                    >
                                        <Field
                                            name="password"
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            as={TextField}
                                            error={!!(errors.password && touched.password)}
                                        />
                                    </Tooltip>
                                </Grid>
                            </Grid>

                            <Box sx={{ width: '100%', marginTop: 3, display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        width: 'auto',
                                        padding: '12px 24px', 
                                        backgroundColor: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        },
                                    }}
                                >
                                    Log In
                                </Button>
                            </Box>

                            {errorMessage && (
                                <Typography color="error" variant="body2" sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                                    {errorMessage}
                                </Typography>
                            )}
                        </Form>
                    )}
                </Formik>

                <Typography variant="body2" sx={{ marginTop: 3 }}>
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Login;