import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setProducts(response.data.data);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((prod) => {
    const title = prod.title.toLowerCase();
    const query = searchQuery.toLowerCase();
    return query.length === 1 ? title.startsWith(query) : title.includes(query);
  });

  if (isLoading) return <h2 className="text-center">Loading products...</h2>;
  if (isError) return <h2 className="text-center text-red-500">Error loading products</h2>;
  if (!filteredProducts.length) return <h2 className="text-center">No products found</h2>;

  return (
    <div className="py-10 px-6">
      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-green-500"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredProducts.map((prod) => (
          <div key={prod.id} className="border rounded-lg shadow-md overflow-hidden">
            <Link to={`/product/${prod.id}`} className="block">
              <img 
                src={prod.imageCover || 'https://via.placeholder.com/150'}
                className="w-full h-48 object-cover"
                alt={prod.title}
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mt-2">{prod.title}</h3>
                <span className="text-sm font-medium">{prod.price} EGP</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
