import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box  from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';

function LandingPage() {
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user');
                setUserData(response.data.data);
            } catch(error) {
                setError('Failed to fetch user data. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: 'center',
            }}
        >
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <>
                <Typography variant="h4" gutterBottom>
                    Welcome, {userData?.username}!
                </Typography>
                <Typography variant="body1">
                    We're glad to have you here. Feel free to explore the app.
                </Typography>
                <Box sx={{ marginTop: 4 }}>
                    <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/home')} // Navigate to the Home Page
                    sx={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        textTransform: 'none',
                    }}
                    >
                    Go to Home Page
                    </Button>
                </Box>
                </>
            )}
            </Container>
    );

}
export default LandingPage;