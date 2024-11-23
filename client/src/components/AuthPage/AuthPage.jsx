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
                    padding: 3,  
                    borderRadius: 2, 
                }}
            >
                <Typography variant="h3" gutterBottom>
                    Welcome to Cromwell
                </Typography>

                <Grid container 
                    direction="column"  
                    spacing={3}          
                    sx={{ width: '100%' }}
                >
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="outlined"
                            size="medium"
                            sx={{ maxWidth: '200px' }}
                            onClick={goToSignup}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="outlined"
                            size="medium"
                            sx={{ maxWidth: '200px' }}
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