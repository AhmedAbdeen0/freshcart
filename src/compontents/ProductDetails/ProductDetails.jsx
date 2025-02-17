import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../../compontents/Card/Card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [RelatedProducts, setRelatedProducts] = useState(null);
  let { id } = useParams();

  const { addProductToCart } = useContext(CartContext);

  async function getProductDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getRelatedProducts() {
    try {
      if (!productDetails?.category?._id) return;
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`
      );
      setRelatedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails) {
      getRelatedProducts();
    }
  }, [productDetails]);

  if (loading) return <p>Loading...</p>;
  if (!productDetails) return <p>No product found</p>;

  return (
    <>
      <section className="grid gap-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-12">
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <ReactImageGallery
            showNav={false}
            showPlayButton={false}
            items={productDetails.images.map((image) => ({
              original: image,
              thumbnail: image,
            }))}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-9 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-600">
              {productDetails.title}
            </h2>
            <h3 className="text-primary-600 font-semibold">
              {productDetails.category?.name}
            </h3>
          </div>
          <p className="text-gray-400">{productDetails.description}</p>
          <div className="flex justify-between items-center">
            <span>{productDetails.price} L.E</span>
            <div>
              <i className="fa-solid fa-star mr-2 text-yellow-500"></i>
              <span>{productDetails.ratingsAverage}</span>
            </div>
          </div>
          <button
            onClick={() => {
              addProductToCart({ productId: id });
            }}
            className="btn bg-primary-700 hover:bg-primary-900 text-white font-semibold w-full"
          >
            Add to Cart
          </button>
        </div>
      </section>
      <section>
        <h2 className="text-2xl text-gray-600 my-8">Related Products</h2>
        {RelatedProducts ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={15}
            modules={[Navigation, Pagination]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
          >
            {RelatedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <Card productInfo={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Loading related products...</p>
        )}
      </section>
    </>
  );
}
