import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file) => data.append("images", file));
      } else {
        data.append(key, value);
      }
    });

    try {
      await axios.post("http://localhost:8000/api/products/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit product.");
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
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Post Your Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                { label: "Product Name", name: "name", type: "text" },
                { label: "Price", name: "price", type: "text" },
                { label: "Discount", name: "discount", type: "text" },
                { label: "City", name: "city", type: "text" },
                { label: "State", name: "state", type: "text" },
                { label: "Country", name: "country", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone Number", name: "phone_number", type: "text" },
                { label: "Type (ID)", name: "type", type: "text" },
              ].map(({ label, name, type }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <TextField
                    fullWidth
                    label={label}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  multiline
                  rows={3}
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  startIcon={<Upload />}
                  sx={{ bgcolor: "#1976d2" }}
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
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                    />
                  }
                  label="Mark as Active"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit Product
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
