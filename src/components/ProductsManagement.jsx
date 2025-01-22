import React, { useState, useEffect } from "react"
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import axios from "axios"

const ProductsManagement = () => {
  const [products, setProducts] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/campus-store/products/my", {
        withCredentials: true,
      })
      setProducts(response.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handleAddProduct = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/campus-store/products/add",
        {
          name: productName,
          price: productPrice,
        },
        { withCredentials: true },
      )
      setOpenDialog(false)
      setProductName("")
      setProductPrice("")
      fetchProducts()
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const handleEditProduct = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/campus-store/products/update/${editingProduct.id}`,
        {
          name: productName,
          price: productPrice,
        },
        { withCredentials: true },
      )
      setOpenDialog(false)
      setEditingProduct(null)
      setProductName("")
      setProductPrice("")
      fetchProducts()
    } catch (error) {
      console.error("Error editing product:", error)
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/campus-store/products/delete/${productId}`, {
        withCredentials: true,
      })
      fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        My Products
      </Typography>
      <Button onClick={() => setOpenDialog(true)}>Add New Product</Button>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText primary={product.name} secondary={`$${product.price}`} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  setEditingProduct(product)
                  setProductName(product.name)
                  setProductPrice(product.price)
                  setOpenDialog(true)
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false)
          setEditingProduct(null)
          setProductName("")
          setProductPrice("")
        }}
      >
        <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false)
              setEditingProduct(null)
              setProductName("")
              setProductPrice("")
            }}
          >
            Cancel
          </Button>
          <Button onClick={editingProduct ? handleEditProduct : handleAddProduct}>
            {editingProduct ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ProductsManagement

