import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function Card({ productInfo }) {
  const { imageCover, title, price, description, ratingsAverage, category, id } = productInfo;

  let { addProductToCart } = useContext(CartContext);

  return (
    <div className="card group/card rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img src={imageCover} alt={title} className="w-full h-48 object-scale-down" />

        <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 flex gap-4 justify-center items-center absolute left-0 top-0 w-full h-full bg-slate-400 bg-opacity-40 opacity-0">
          {/* أيقونة عربة التسوق */}
          <div 
            onClick={() => {
              addProductToCart({ productId: id });
            }}
            className="icon w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center cursor-pointer">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>

          {/* أيقونة العدسة المكبرة */}
          <Link 
            to={`/product/${id}`} 
            className="icon w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center cursor-pointer">
            <i className="fa-solid fa-eye"></i>
          </Link>
        </div>
      </div>

      <div className="card-body p-4 space-y-3">
        <header>
          <h3 className="text-lg text-gray-600 font-semibold line-clamp-2">
            <Link to={`/product/${id}`}>
              {title}
            </Link>
          </h3>
          <h4 className="text-sm text-primary-500 font-semibold">
            {category ? category.name : "No Category"}
          </h4>
        </header>
        <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span>{price} EGP</span>
          <div>
            <i className="fa-solid fa-star text-yellow-300 mr-1"></i>
            <span>{ratingsAverage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
