import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateQuantity, removeFromBasket } from '../../redux/basketSlice.js'; // Ensure these actions are correctly imported

function Cart() {
  const basketItems = useSelector((state) => state.basket.items);
  const totalPrice = useSelector((state) => state.basket.totalPrice);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromBasket(item._id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {basketItems.length > 0 ? (
        <List>
          {basketItems.map((item) => (
            <ListItem key={item._id} divider sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemText
                primary={`${item.name}`}
                secondary={`Price: $${(item.price * item.quantity).toFixed(2)}`}
                sx={{ flexGrow: 1 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => handleDecrement(item)} aria-label="decrease quantity">
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ margin: '0 10px' }}>
                  {item.quantity}
                </Typography>
                <IconButton onClick={() => handleIncrement(item)} aria-label="increase quantity">
                  <AddIcon />
                </IconButton>
              </Box>
              <IconButton
                onClick={() => handleRemove(item)}
                aria-label="remove item"
                color="error"
                sx={{ marginLeft: 2 }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total: ${totalPrice > 0 ? totalPrice.toFixed(2) : '0.00'}
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            '&:hover': {
                backgroundColor: 'primary.main',
                color: '#fff',
            },
          }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}

export default Cart;