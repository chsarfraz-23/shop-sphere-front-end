import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const fetchProducts = async (page, pageSize, setProducts, setMeta, setError, setIsLoading) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    setError("Authentication required.");
    setIsLoading(false);
    return;
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_SHOPSPHERE_API_URL}/products/?page=${page}&page_size=${pageSize}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Session expired, please log in again.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();
    setProducts(data.results);
    setMeta(data.meta);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

const ProductRow = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Default page size

  useEffect(() => {
    setIsLoading(true);
    fetchProducts(page, pageSize, setProducts, setMeta, setError, setIsLoading);
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta.page_total) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    setPage(1); // Reset to first page on size change
  };

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Alert severity="error">Error loading products: {error}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {/* Product Grid */}
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
              <img
                src={product.images && product.images[0] ? product.images[0].image : '/default-image.jpg'}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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

      {/* Pagination Controls — Centered at Bottom */}
      {meta && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel id="page-size-label">Page Size</InputLabel>
              <Select
                labelId="page-size-label"
                value={pageSize}
                label="Page Size"
                onChange={handlePageSizeChange}
              >
                {[4, 8, 12, 16, 20].map(size => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= meta.page_total}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductRow;
