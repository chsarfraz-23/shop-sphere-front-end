import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import { Delete, Update } from "@mui/icons-material";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Setup Axios headers globally with token on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
    }
  }, []);

  // Fetch cart items from API (GET)
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SHOPSPHERE_API_URL}/cart-products/`
        );
        setCartItems(response.data.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Handle delete API call
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SHOPSPHERE_API_URL}/cart-products/${id}/`
      );
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete cart item", err);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  // Handle update (future feature)
  const handleUpdate = async (id) => {
    console.log("Update item:", id);
    alert("Update functionality coming soon!");
  };

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
          px: 2,
        }}
      >
        <CircularProgress color="primary" size={30} />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading cart items...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Typography color="error" align="center" mt={10} variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Typography color="text.secondary" align="center" variant="h6">
          Your cart is empty.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
        minHeight: "100vh",
        py: 6,
        px: 2,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          py: 4,
          px: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          mb={4}
          sx={{
            display: "inline-block",
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "#fff",
            boxShadow: "0 4px 15px rgba(37, 117, 252, 0.4)",
            letterSpacing: 2,
            userSelect: "none",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Your Cart
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card
                sx={{
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                  transition: "box-shadow 0.3s ease-in-out",
                  borderRadius: 2,
                  "&:hover": {
                    boxShadow:
                      "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    Product: {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {item.product.city}, {item.product.state},{" "}
                    {item.product.country}
                  </Typography>

                  {/* Boolean fields displayed professionally */}
                  <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      label={
                        item.is_ordered ? "Ordered ?" : "Not Ordered ?"
                      }
                      color={item.is_ordered ? "success" : "warning"}
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      label={
                        item.is_active ? "Active ?" : "Inactive ?"
                      }
                      color={item.is_active ? "primary" : "default"}
                      variant="outlined"
                      size="small"
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, fontStyle: "italic" }}
                  >
                    Added on: {formatDate(item.added_at)}
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{
                    justifyContent: "flex-end",
                    pb: 2,
                    pr: 2,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    startIcon={<Update />}
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CartItems;
