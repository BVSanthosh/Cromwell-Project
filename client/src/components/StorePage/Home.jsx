import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, Card,CardContent } from '@mui/material';
import { Carousel } from 'react-responsive-carousel'; 
import "react-responsive-carousel/lib/styles/carousel.min.css";

//Store the description to display for each category
const categoryDescriptions = {
  Laptops: "Discover powerful laptops for work, gaming, and personal use. Get the latest features in sleek designs.",
  Smartphones: "Explore a wide range of smartphones with cutting-edge technology to keep you connected.",
  Tablets: "Find versatile tablets perfect for entertainment, work, and creativity.",
  Headphones: "Immerse yourself in high-quality sound with our selection of headphones. Perfect for music, gaming, and work.",
  Accessories: "Complete your tech setup with our range of accessories, including chargers, cases, and more.",
};

/**
 * Home Component
 * The home page of the store which contains a description of the store and a subsection for each category with a preview of all the products available
 */
function Home() {
  const { products } = useSelector((state) => state.products); //Get the products map from the Redux store

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          VSB Electronics
        </Typography>
        <Typography variant="body1">
          VSB Electronics is your one-stop online store for all things tech. Whether you're looking for a new laptop, smartphone, tablet, or accessories, we have a wide range of products to fit your needs. With unbeatable prices and a smooth shopping experience, VSB Electronics ensures that you get the best deals on the latest gadgets.
        </Typography>
      </Box>

      {Object.keys(products).map((category) => (
        <Card key={category} sx={{ marginBottom: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              {category}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
              <Box sx={{ width: '80%', maxWidth: '600px' }}>
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop
                  autoPlay
                  interval={3000}
                  transitionTime={500}
                >
                  {products[category].map((product, idx) => (
                    <div key={idx}>
                      <img
                        src={`http://localhost:5000/products/${product.image}`}
                        alt={`${category} Preview ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '300px',
                          borderRadius: '10px',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
              {categoryDescriptions[category]}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Home;