import { useSelector } from 'react-redux';
import { Button, Typography, AppBar, Toolbar, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function NavBar({ onNavigate, onCartClick }) {
  const { products } = useSelector((state) => state.products); // Get categories from Redux store
  const basketItemsCount = useSelector((state) => state.basket.totalItems);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          VSB Electronics
        </Typography>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Button color="inherit" onClick={() => onNavigate('home')}>
            Home
          </Button>
          {Object.keys(products).map((category) => (
            <Button
              key={category}
              color="inherit"
              onClick={() => onNavigate(category.toLowerCase())}
            >
              {category}
            </Button>
          ))}
        </Box>
        <IconButton color="inherit" onClick={onCartClick}>
          <Badge badgeContent={basketItemsCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;