import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Upload } from "@mui/icons-material";
import axios from "axios";

const SalePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    city: "",
    state: "",
    country: "",
    address: "",
    email: "",
    phone_number: "",
    is_active: true,
    type: "",
    images: [],
  });

  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchProductTypes = async () => {
      const token = localStorage.getItem('access_token');
      setLoading(true);
      try {
        let allTypes = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages) {
          const response = await fetch(`http://localhost:8000/api/product-types/?page=${page}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          const { results, meta } = data;

          allTypes = [...allTypes, ...results];
          totalPages = meta.page_total;
          page += 1;
        }

        setProductTypes(allTypes);
      } catch (err) {
        console.error("Failed to fetch product types:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const { images, ...productData } = formData;

    try {
      const productResponse = await axios.post("http://localhost:8000/api/products/", productData);
      const productId = productResponse.data.id;

      if (images.length > 0) {
        const imageData = new FormData();
        images.forEach((file) => {
          imageData.append("images", file);
        });
        imageData.append("product", productId);

        await axios.post("http://localhost:8000/api/product-images/", imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Product submitted successfully!");
      setFormData({
        name: "",
        price: "",
        discount: "",
        city: "",
        state: "",
        country: "",
        address: "",
        email: "",
        phone_number: "",
        is_active: true,
        type: "",
        images: [],
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit product. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
            Post Your Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {[
                { label: "Product Name", name: "name", type: "text", required: true },
                { label: "Price", name: "price", type: "number", required: true },
                { label: "Discount", name: "discount", type: "number" },
                { label: "City", name: "city", type: "text", required: true },
                { label: "State", name: "state", type: "text", required: true },
                { label: "Country", name: "country", type: "text", required: true },
                { label: "Email", name: "email", type: "email", required: true },
                { label: "Phone Number", name: "phone_number", type: "tel", required: true },
              ].map(({ label, name, type, required }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <TextField
                    fullWidth
                    label={`${label}${required ? ' *' : ''}`}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </Grid>
              ))}

              {/* Updated Product Type Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="type-select-label"
                    shrink={true}
                    sx={{
                      position: 'relative',
                      transform: 'none',
                      fontSize: '1rem',
                      color: 'text.primary',
                      fontWeight: '500',
                      mb: 1,
                      '&.Mui-focused': {
                        color: 'primary.main',
                      }
                    }}
                  >
                    Product Type *
                  </InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    fullWidth
                    displayEmpty
                    sx={{
                      backgroundColor: 'white',
                      '& .MuiSelect-select': {
                        padding: '12px 14px',
                      },
                    }}
                  >
                    {loading ? (
                      <MenuItem disabled>
                        <CircularProgress size={24} />
                        <Typography variant="body2" sx={{ ml: 2 }}>Loading product types...</Typography>
                      </MenuItem>
                    ) : (
                      productTypes.length > 0 ? (
                        productTypes.map((type) => (
                          <MenuItem key={type.id} value={type.id}>
                            {type.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>
                          No product types available
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address *"
                  name="address"
                  multiline
                  rows={3}
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  startIcon={<Upload />}
                  sx={{
                    bgcolor: 'primary.main',
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    }
                  }}
                >
                  Upload Images
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {formData.images.length > 0 && (
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {formData.images.length} image(s) selected
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Mark as Active"
                  sx={{ color: 'text.primary' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={submitLoading}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    }
                  }}
                >
                  {submitLoading ? (
                    <>
                      <CircularProgress size={24} color="inherit" sx={{ mr: 2 }} />
                      Submitting...
                    </>
                  ) : (
                    'Submit Product'
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SalePage;