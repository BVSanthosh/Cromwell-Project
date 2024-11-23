import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box  from '@mui/material/Box';
import AppBar  from '@mui/material/AppBar';
import Toolbar  from '@mui/material/Toolbar';

function HomePage() {
    return (
        <>
          <AppBar position="static" sx={{ marginBottom: 4 }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Cromwell
              </Typography>
              <Button color="inherit" href="/">
                Home
              </Button>
              <Button color="inherit" href="/profile">
                Profile
              </Button>
              <Button color="inherit" href="/about">
                About
              </Button>
            </Toolbar>
          </AppBar>
    
          <Container sx={{ textAlign: 'center', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
              Welcome to the Home Page!
            </Typography>
            <Typography variant="body1">
              Here is some dummy content, and you can navigate to other pages from here.
            </Typography>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="body2" color="textSecondary">
                Some additional content can go here, like user profile information or app features.
              </Typography>
            </Box>
          </Container>
        </>
      );

}
export default HomePage;