import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box  from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import bgImage from '../../assets/landing-page-bg.avif';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'row',
                minHeight: '100vh',
            }}
        >
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            padding: 4,
                            width: '33.33%', 
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            Hi {userData?.username}!
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 3 }}>
                            At VSB Electronics, we bring the latest and most innovative technology right to your fingertips. Whether you're looking for high-performance laptops, the newest smartphones, or cutting-edge gadgets, we offer an extensive range of products to cater to your tech needs.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => navigate('/store')}
                            sx={{
                                padding: '12px 24px',
                                fontSize: '16px',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: '#fff',
                                },
                            }}
                            
                        >
                            Go to Store
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            flex: 2, 
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: '100vh',
                        }}
                    />
                </>
            )}
        </Container>
    );

}

export default LandingPage;