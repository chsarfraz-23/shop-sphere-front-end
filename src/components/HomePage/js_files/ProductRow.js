import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const ProductRow = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$10', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: '$20', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: '$30', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: '$40', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <Grid container spacing={3} justifyContent="center">
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <Typography variant="h6" sx={{ marginTop: '10px' }}>
              {product.name}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: '5px' }}>
              {product.price}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductRow;
