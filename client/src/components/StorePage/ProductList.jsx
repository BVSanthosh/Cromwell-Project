import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Box, Pagination, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { addToBasket } from '../../redux/basketSlice.js'; // Assuming addToBasket action is correct

function ProductList({ category, description, products }) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleAddToBasket = (product) => {
        dispatch(addToBasket(product)); // Add product to basket
    };

    return (
        <>
            <Typography 
                variant="h4" 
                sx={{
                    fontWeight: 'bold', 
                    margin: 4, 
                    textAlign: 'center', 
                    textTransform: 'uppercase', 
                    borderBottom: '2px solid #ccc', 
                    paddingBottom: 1
                }}
            >
                {category}
            </Typography>

            <Typography 
                variant="body1" 
                sx={{ 
                    textAlign: 'center', 
                    margin: '0 auto', 
                    marginBottom: 4, 
                    maxWidth: 600, 
                    color: 'text.secondary' 
                }}
            >
                {description}
            </Typography>

            <Grid container spacing={4} direction="column">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <Grid item xs={12} key={product.id}>
                            <Card sx={{ display: 'flex', boxShadow: 3, width: '100%', maxWidth: 800, margin: '0 auto' }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 200, height: 200, objectFit: 'cover' }}
                              image={`http://localhost:5000/products/${product.image}`}
                              alt={product.name}
                            />
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2, flexGrow: 1 }}>
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                                            {product.description}
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                                            ${product.price}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={() => handleAddToBasket(product)}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'primary.main',
                                                    color: '#fff',
                                                },
                                            }}
                                        >
                                            Add to Basket
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No products available in this category.</Typography>
                )}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Pagination
                    count={Math.ceil(products.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </>
    );
}

export default ProductList;