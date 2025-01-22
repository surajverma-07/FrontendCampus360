import React, { useState } from "react";
import { Typography, Button, TextField, Box, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    phone: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("phone", formData.phone);
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/campus-store/products/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // Handle response
      navigate('/product/my-products');
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Product Name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="price"
            label="Price"
            fullWidth
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="category"
            label="Category"
            fullWidth
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phone"
            label="Phone"
            fullWidth
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload Product Image
            </Button>
          </label>
          {image && <Typography variant="body2">{image.name}</Typography>}
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Product
      </Button>
    </Box>
  );
};

export default AddProduct;
