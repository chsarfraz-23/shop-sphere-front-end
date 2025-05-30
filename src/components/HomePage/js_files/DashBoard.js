import React from 'react';
import { Box, Container, Grid, Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import ProductRow from "./ProductRow";

const Dashboard = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Site Title */}
        <Box textAlign="center" sx={{ padding: '20px' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
            Chachu Super Store
          </Typography>
        </Box>

        {/* Dashboard Links */}
        <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: '20px' }}>
          <Grid item xs={12} sm={4}>
            <Link to="/order-now" style={{ textDecoration: 'none' }}>
              <Button variant="contained" fullWidth sx={{ padding: '15px', backgroundColor: '#4caf50' }}>
                Order Now
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <Button variant="contained" fullWidth sx={{ padding: '15px', backgroundColor: '#2196f3' }}>
                Check Your Cart
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/sale" style={{ textDecoration: 'none' }}>
              <Button variant="contained" fullWidth sx={{ padding: '15px', backgroundColor: '#2196f3' }}>
                Sale Product
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/select-product" style={{ textDecoration: 'none' }}>
              <Button variant="contained" fullWidth sx={{ padding: '15px', backgroundColor: '#ff9800' }}>
                Select Your Product
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/checkout-plan" style={{ textDecoration: 'none' }}>
              <Button variant="contained" fullWidth sx={{ padding: '15px', backgroundColor: '#9c27b0' }}>
                Checkout Your Plan
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/shop" style={{ textDecoration: 'none' }}>
              <Button variant="contained" fullWidth sx={{ padding: '15px', backgroundColor: '#f44336' }}>
                Shop
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/shopping-stores" style={{ textDecoration: 'none' }}>
              <Button variant="contained" fullWidth sx={{ padding: '15px', backgroundColor: '#607d8b' }}>
                Shopping Stores
              </Button>
            </Link>
          </Grid>
        </Grid>

        {/* Product Row */}
        <ProductRow />
      </Container>
    </Box>
  );
};

export default Dashboard;
