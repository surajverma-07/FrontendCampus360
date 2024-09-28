import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/campus-store/products/my', { withCredentials: true });
      setProducts(response.data.data.products);
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">My Products</h1>
      <div className="flex flex-wrap justify-center xl:gap-x-20 mb-8">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 text-black">
            <div className="p-4">
              <div className="bg-white rounded-lg aspect-square flex items-center justify-center mb-4 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
              <p className="text-sm mb-4">Category: {product.category}</p>
              <p className="text-sm mb-4">Price: ₹{product.price}</p>
              <p className="text-sm mb-4">Description: {product.description}</p>
              <p className="text-sm mb-4">Seller: {product.sellerId}</p>
              {product.college && (
                <p className="text-sm mb-4">College: {product.college}</p>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => setSelectedProduct(product)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex justify-center items-center">
          <div className="bg-gray-200 p-4 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Update Product</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Description:
                <input
                  type="text"
                  value={selectedProduct.description}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Price:
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Category:
                <input
                  type="text"
                  value={selectedProduct.category}
 onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Image:
                <input
                  type="text"
                  value={selectedProduct.image}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <button
                className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => handleUpdate(selectedProduct._id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => setSelectedProduct(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProducts;