import type React from "react"
import { useState } from "react"
import { Typography, Button, TextField, Box, Grid } from "@mui/material"
import axios from "axios"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    phone: "",
  })
  const [image, setImage] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const productData = new FormData()
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key as keyof typeof formData])
    })
    if (image) {
      productData.append("image", image)
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/campus-store/products/add", productData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log("Product added successfully:", response.data)
      // Reset form or show success message
    } catch (error) {
      console.error("Error adding product:", error)
      // Show error message
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Add New Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="name"
            label="Product Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: "none" }}
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
  )
}

export default AddProduct

