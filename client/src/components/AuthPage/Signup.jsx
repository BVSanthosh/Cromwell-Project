import React, { useState }  from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Container, TextField, Typography, Paper, Box, Tooltip} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

function Signup() {
    const navigate = useNavigate();  //used for navigating to the login page
    const [errorMessage, setErrorMessage] = useState('');   //State for the error message

    //Validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string()  
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters long'),
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Passowrd must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Passowrd must contain at least one lowercase letter')
            .matches(/\d/, 'Passowrd must contain at least one number')
            .matches(/[!@#$%^&*_.]/, 'Passowrd must contain at least one symbol'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    //Handle submitting the signup form data to the server
    const handleSubmit = async (values) => {
        const { confirmPassword, ...userCredentials } = values;

        try {
            const response = await axios.post('http://localhost:5000/user/register', userCredentials);  //Sends a POST request to the registration API (POST /user/register)

            if (response.data.success) {
                console.log('Signup successful:', response.data);
                navigate('/login');
            } else {
                setErrorMessage('Signup failed. Please try again.');
            }
        } catch(error) {
            console.error('Error signing up:', error.response ? error.response.data : error.message);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
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
                    data-testid="signup-title"
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        marginBottom: 3, 
                    }}
                >
                    Sign Up
                </Typography>

                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                                <Grid item xs={12}>
                                    <Tooltip 
                                        title={touched.username && errors.username ? errors.username : ""} 
                                        open={touched.username && Boolean(errors.username)}
                                    >
                                        <Field
                                            data-testid="username-input"
                                            name="username"
                                            as={TextField}
                                            variant="outlined"
                                            label="Username"
                                            fullWidth
                                            error={touched.username && Boolean(errors.username)}
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <Tooltip 
                                        title={touched.email && errors.email ? errors.email : ""} 
                                        open={touched.email && Boolean(errors.email)}
                                    >
                                        <Field
                                            data-testid="email-input"
                                            name="email"
                                            as={TextField}
                                            variant="outlined"
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            error={touched.email && Boolean(errors.email)}
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <Tooltip
                                        title={touched.password && errors.password ? errors.password : ""} 
                                        open={touched.password && Boolean(errors.password)}
                                    >
                                        <Field
                                            data-testid="password-input"
                                            name="password"
                                            as={TextField}
                                            variant="outlined"
                                            label="Password"
                                            type="password"
                                            fullWidth
                                            error={touched.password && Boolean(errors.password)}
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <Tooltip
                                        title={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""} 
                                        open={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    >
                                        <Field
                                            data-testid="newpassword-input"
                                            name="confirmPassword"
                                            as={TextField}
                                            variant="outlined"
                                            label="Confirm Password"
                                            type="password"
                                            fullWidth
                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                        />
                                    </Tooltip>
                                </Grid>
                            </Grid>

                            <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    data-testid="signup-button"
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
                                    Sign Up
                                </Button>
                            </Box>

                            {errorMessage && (
                                <Typography color="error" variants="body2" sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                                    {errorMessage}
                                </Typography>
                            )}
                        </Form>
                    )}
                </Formik>
                
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Already have an account? <Link data-testid="login-link" to="/login">Log In</Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Signup;