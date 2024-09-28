import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Box, Container, Grid, Typography, Button, TextField, Card, CardContent, CardMedia, CardActions, IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/campus-store/products/my', { withCredentials: true });
      setProducts(response.data.data.products.sort((a, b) => a.name.localeCompare(b.name)));
      console.log(response.data)
    } catch (error) {
      console.error('Failed to fetch products!');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/campus-store/products/update/${id}`, selectedProduct, { withCredentials: true });
      toast.success('Product updated successfully!');
      fetchProducts();
      setOpen(false); // Close the update window after updating
    } catch (error) {
      toast.error('Failed to update product!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/campus-store/products/delete/${id}`, { withCredentials: true });
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product!');
    }
  };

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Products
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {products.map((product) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={product._id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid item>
                    <CardMedia
                      component="img"
                      height="100"
                      width="100"
                      image={product.image}
                      alt={product.name}
                      // sx={{ objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {product.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ₹{product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Seller: {product.sellerId}
                    </Typography>
                    {product.college && (
                      <Typography variant="body2" color="text.secondary">
                        College: {product.college}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleClickOpen(product)}>Update</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(product._id)}>Delete</Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Update Product
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              type="text"
              value={selectedProduct ? selectedProduct.name : ""}
              onChange={(e) => setSelectedProduct ({ ...selectedProduct, name: e.target.value })}
              placeholder="Name"
              fullWidth
            />
            <TextField
              type="text"
              value={selectedProduct ? selectedProduct.description : ""}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
              placeholder="Description"
              fullWidth
            />
            <TextField
              type="number"
              value={selectedProduct ? selectedProduct.price : ""}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              placeholder="Price"
              fullWidth
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(selectedProduct._id)} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyProducts;