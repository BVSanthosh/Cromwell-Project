import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom'; 

function AuthPage() {
    const navigate = useNavigate();

    //event handler for navigating to the signup page
    const goToSignup = () => {
        navigate('/signup');
    }

    //event handler for navigating to the login page
    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Paper
                sx={{
                    padding: 8, 
                    borderRadius: 3,
                    border: '1px solid #ddd',
                    boxShadow: 3, 
                    width: '100%',
                    maxWidth: 400, 
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                    Welcome to VSB Electronics
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 4, color: 'text.secondary' }}>
                    Discover the latest tech gadgets and electronics. Join us today to explore more!
                </Typography>

                <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                maxWidth: 250,
                                padding: '12px',
                                backgroundColor: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.dark', // Darken on hover
                                },
                            }}
                            onClick={goToSignup}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            sx={{
                                maxWidth: 250,
                                padding: '12px',
                                borderColor: 'primary.main',
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: '#fff',
                                },
                            }}
                            onClick={goToLogin}
                        >
                            Log In
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );

}
export default AuthPage;