import axios from "axios";
import Card from "../../compontents/Card/Card";
import { useEffect, useState } from "react";
import HomeSlider from "../../compontents/HomeSlider/HomeSlider";
import CategorySlider from "../../compontents/categorySlider/categorySlider";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  async function getProducts() {
    try {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <HomeSlider />
      <CategorySlider />
      
      {error ? (
        <p className="text-red-500 text-center mt-4">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <Card key={product._id} productInfo={product} />
          ))}
        </div>
      )}
    </>
  );
}
