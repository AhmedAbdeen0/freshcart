import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import CartItem from "../../compontents/Cartitem/Cartitem";
import { Link } from "react-router-dom";
import Loading from "../../compontents/loading/loading";

export default function Cart() {
  let { getCartProducts, cartInfo, clearCart } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, []); 

  function handleClearCart() {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  }

  return (
    <>
      {cartInfo === null ? (
        <Loading/>
      ) : (
        <section>
          <div className="flex gap-8 items-center">
            <i className="fa-brands fa-opencart text-3xl"></i>
            <h2 className="text-xl text-slate-600 pl-4 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:left-1 before:top-1/2 before:-translate-y-1/2">
              Your Shopping Cart
            </h2>
          </div>

          {!cartInfo?.data?.products?.length ? (
            <div className="mt-6 bg-gray-100 p-6 rounded-md shadow flex justify-center items-center flex-col gap-3">
              <h2>Oops! Your cart is empty. Start shopping now by clicking the button below and find something you love!</h2>
              <Link to="/" className="btn bg-primary-600 hover:bg-primary-700 text-white">
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mt-6">
                {cartInfo?.data?.products?.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>
              <div className="mt-5 flex justify-between items-center">
                <p className="text-xl">
                  <i className="fa-solid fa-dollar-sign text-xl mr-2 text-primary-600"></i>
                  Your Total Cart Price:
                  <span className="text-primary-600 font-bold">
                    ${(cartInfo?.data?.totalCartPrice || 0).toFixed(2)}
                  </span>
                </p>
                <button onClick={handleClearCart} className="btn bg-red-500 hover:bg-red-600 text-white">
                  <i className="fa-solid fa-trash mr-2"></i>Clear Cart
                </button>
              </div>
              <Link to="/checkout" className="inline-block btn w-full text-center mt-8 bg-primary-500 hover:bg-primary-700 text-white">
                Next Step(payment)
              </Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
