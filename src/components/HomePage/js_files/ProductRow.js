import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';

// Function to fetch products (now outside the component)
const fetchProducts = async (setProducts, setMeta, setError, setIsLoading) => {
  const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
  if (!token) {
    setError("Authentication required.");
    setIsLoading(false);
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/products/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Add the Bearer token here
      },
    });

    if (!response.ok) {
      // If response is not OK (e.g., 401), handle token expiration
      if (response.status === 401) {
        // Token expired, handle token refresh (this can be implemented)
        throw new Error("Session expired, please log in again.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();
    setProducts(data.results); // Set the products
    setMeta(data.meta);  // Set pagination metadata
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

const ProductRow = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);  // For meta data like pagination info
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts(setProducts, setMeta, setError, setIsLoading);
  }, []);  // Empty dependency array ensures the API is called once on component mount

  // If there's an error fetching products
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Alert severity="error">Error loading products: {error}</Alert>
      </Box>
    );
  }

  // If the data is still loading
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {/* Display Pagination Info */}
      {meta && meta.links && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Page {meta.page} of {meta.page_total} (Showing {meta.page_size} items per page, Total results: {meta.results_total})
          </Typography>
          <Box>
            {/* Add Previous and Next Page Links with checks */}
            {meta.links.previous && (
              <Button variant="outlined" sx={{ mr: 1 }}>Previous</Button>
            )}
            {meta.links.next && (
              <Button variant="outlined">Next</Button>
            )}
          </Box>
        </Box>
      )}

      {/* Render Products */}
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
              {/* Handle Images */}
              <img
                src={product.images && product.images[0] ? product.images[0].image : '/default-image.jpg'}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '200px',  // Adjust height for better presentation
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Discount: {product.discount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {product.city}, {product.state}, {product.country}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contact: {product.phone_number}
                </Typography>
                <Typography variant="body2" color={product.is_active ? 'green' : 'red'}>
                  Status: {product.is_active ? 'Active' : 'Inactive'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductRow;
