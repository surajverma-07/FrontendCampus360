import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For making API calls
import { useNavigate } from 'react-router-dom'; // For navigation

function MyProducts() {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate for actions like edit

  // Fetch the products when the component loads
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await axios.get('/api/products/my', {
         withCredentials:true
        });
        setProducts(response.data.products || []); // Ensure products is always an array
        console.log(response.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching products');
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  // Handle Edit button (optional)
  const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  // Handle Delete button (optional)
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
          },
        });
        setProducts(products.filter(product => product._id !== productId)); // Remove from state after deletion
      } catch (err) {
        alert('Failed to delete the product');
      }
    }
  };

  if (loading) {
    return <div>Loading your products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>My Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
              <h3>{product.name}</h3>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Sold:</strong> {product.sold ? 'Yes' : 'No'}</p>
              <button onClick={() => handleEdit(product._id)}>Edit</button>
              <button onClick={() => handleDelete(product._id)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyProducts;
