import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/campus-store/products',{withCredentials:true});
      setProducts(response.data.data.products);
      console.log(response.data)
    } catch (error) {
      console.error('Failed to fetch products!');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
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
              <p className="text-sm mb-4">College: {product.college}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;