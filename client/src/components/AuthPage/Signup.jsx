import axios from 'axios';
import { useState } from  'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    //Formik validation schema using Yup
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

    //event handler for submitting the signup form data to the server
    const handleSubmit = async (values) => {
        const { confirmPassword, ...userCredentials } = values;

        try {
            const response = await axios.post('http://localhost:5000/user/signup', userCredentials);  //establishes a http connection to the specified endpoint

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
                                    <Field 
                                        name="username"
                                        as={TextField}
                                        variant="outlined"
                                        label="Username"
                                        fullWidth
                                        error={touched.username && Boolean(errors.username)}
                                        helperText={touched.username && errors.username}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field 
                                        name="email"
                                        as={TextField}
                                        variant="outlined"
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field 
                                        name="password"
                                        as={TextField}
                                        variant="outlined"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field 
                                        name="confirmPassword"
                                        as={TextField}
                                        variant="outlined"
                                        label="Confirm Password"
                                        type="password"
                                        fullWidth
                                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ marginTop: 2, }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    type='submit'
                                    sx={{ padding: '12px' }}
                                >
                                    Sign Up
                                </Button>
                            </Box>

                            {errorMessage && (
                                <Typography color="error" variants="body2" sx={{ marginTop: 2 }}>
                                    {errorMessage}
                                </Typography>
                            )}
                        </Form>
                    )}
                </Formik>

                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Already have an account? <Link to="/login">Log In</Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Signup;