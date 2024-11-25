import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography, AppBar, Toolbar, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/**
 * NavBar Component
 * Contians the navigation bar which allows the user to navigate between the home page, cart and product categories
 * 
 * Props:
 *  onNavigate - function for directing the user to the chosen section
 *  onCartClick - function for directing the user to the cart
 */
function NavBar({ onNavigate, onCartClick }) {
  const { products } = useSelector((state) => state.products); //Get products map from the Redux store
  const basketItemsCount = useSelector((state) => state.basket.totalItems);  //Get number of items in the basket from the redux store

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
        <IconButton data-testid="cart-button" color="inherit" onClick={onCartClick}>
          <Badge badgeContent={basketItemsCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;