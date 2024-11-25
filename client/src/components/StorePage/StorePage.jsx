import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../redux/productsSlice.js';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import ProductList from './ProductList.jsx';
import Cart from './Cart.jsx';

/**
 * StorePage Component
 * Parent component which contains the various sections within the store (navigation bar, home page, product list, cart)
 */
function StorePage() {
    const dispatch = useDispatch();  
    const { products } = useSelector((state) => state.products);  //Gets the products map from the redux store
    const { items: basketItems } = useSelector((state) => state.basket);  //Gets the basket list from the redux store
    const [activePage, setActivePage] = useState('home');  //State for the currently active page
    const [isCartVisible, setCartVisible] = useState(false);  //State for cart visability status

    //Makes a GET request to the products API (GET /product)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                dispatch(setProducts(response.data.data)); //Dispatches the fetched products to the products slice
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [dispatch]);

    //Handle navigation between pages
    const handleNavigation = (page) => {
        setActivePage(page);
        setCartVisible(false);
    };

    //Toggle cart visibility
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