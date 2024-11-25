import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import bgImage from '../../assets/landing-page-bg.avif';

/**
 * LandingPage Component
 * Welcomes the user
 * Displays a body of text introducing the user to the e-commerce platform
 * Includes a button to direct the user to the store
 */
function LandingPage() {
    //Makes GET request to the user API (GET /user) to retrieve the username
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user');
                setUserData(response.data.data);  //Sets the username to the userData State
            } catch(error) {
                setError('Failed to fetch user data. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    const navigate = useNavigate();  //Used for navigating to the store page
    const [userData, setUserData] = useState(null);  //State for the username
    const [loading, setLoading] = useState(true);  //State for loading status when waiting for the response
    const [error, setError] = useState(null);  //State for the error status when an error occurs in the response

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'row',
                minHeight: '100vh',
                justifyContent: 'center', 
                alignItems: 'center',
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
                            data-testid="store-button"
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