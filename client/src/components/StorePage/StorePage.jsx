import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../redux/productsSlice.js';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import ProductList from './ProductList.jsx';
import Cart from './Cart.jsx';

function StorePage() {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products); // Access the products map
    const { items: basketItems } = useSelector((state) => state.basket);
    const [activePage, setActivePage] = useState('home'); // Default to the home page
    const [isCartVisible, setCartVisible] = useState(false);

    // Fetch products from the backend and dispatch to Redux
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products'); // Replace with your actual API endpoint
                dispatch(setProducts(response.data.data)); // Dispatch the fetched products to Redux
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [dispatch]);

    // Handle navigation between pages
    const handleNavigation = (page) => {
        setActivePage(page);
        setCartVisible(false);
    };

    // Toggle cart visibility
    const toggleCart = () => {
        setCartVisible(!isCartVisible);
    };

    return (
        <>
            <NavBar onNavigate={handleNavigation} onCartClick={toggleCart} />
            {!isCartVisible ? (
                <>
                    {activePage === 'home' && <Home />}
                    {Object.keys(products).map((category) =>
                        activePage === category.toLowerCase() ? (
                            <ProductList
                                key={category}
                                category={category}
                                description={`Explore the best selection of ${category.toLowerCase()} for all your needs. Find top-rated models and great deals.`}
                                products={products[category]} 
                            />
                        ) : null
                    )}
                </>
            ) : (
                <Cart basketItems={basketItems} /> 
            )}
        </>
    );
}

export default StorePage;