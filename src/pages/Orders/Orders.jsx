import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User.context';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../../compontents/loading/loading';

export default function Orders() {
  const { token } = useContext(UserContext);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //* return payload
  let { id } = jwtDecode(token);

  async function getUserOrder() {
    setLoading(true);
    setError(null); // Reset previous errors
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: 'GET',
      };
      let { data } = await axios.request(options);

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setError("Invalid order data received.");
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : "There was an issue with fetching orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      setError("Token not found.");
      setLoading(false); // stop loading if there's no token
      return;
    }

    getUserOrder();
  }, [token]); // Re-fetch when the token changes

  return (
    <>
      <title>Orders - Freshcart</title>
      <meta
        name="description"
        content="Track your orders and manage your purchases with ease at Freshcart."
      />
      <meta
        name="keywords"
        content="Orders, Freshcart, Shopping, Order History, Online Store"
      />
      <meta property="og:title" content="Orders - Freshcart" />
      <meta
        property="og:description"
        content="View and manage all your orders in one place. Check your order status and history on Freshcart."
      />
      <h1 className="text-3xl font-semibold text-primary-700 mb-6 border-b-2 pb-3">
        Order History
      </h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error-message text-red-600">{error}</div>
      ) : orders && orders.length > 0 ? (
        <section className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order p-5 border-2 border-solid border-primary-200 rounded-lg"
            >
              <header className="flex flex-wrap gap-4 sm:gap-0 items-center justify-between mb-8 bg-slate-50 p-2 shadow-md">
                <h3 className="text-xl font-bold pl-2 text-primary-500">
                  Order ID :{' '}
                  <span className="font-bold text-black bg-gray-200 px-2 py-1 rounded-md">
                    #{order.id}
                  </span>
                </h3>
                <div className="status text-white flex gap-2 items-center font-cairo">
                  {order.isPaid ? (
                    <h4 className="bg-green-500 text-white flex items-center p-2 rounded-md w-fit">
                      مدفوع
                    </h4>
                  ) : (
                    <h4 className="bg-red-600 text-white p-2 rounded-md w-fit flex items-center">
                      غير مدفوع
                    </h4>
                  )}
                  {order.isDelivered ? (
                    <h4 className="bg-blue-500 text-white p-2 rounded-md w-fit flex items-center">
                      تم التوصيل
                    </h4>
                  ) : (
                    <h4 className="bg-yellow-400 text-black p-2 rounded-md w-fit flex items-center">
                      جاري التوصيل
                    </h4>
                  )}
                </div>
              </header>

              {/* عرض تاريخ ووقت الطلب بفاصل */}
              <div className="order-date text-xl font-semibold text-gray-700 mb-4">
                <div>
                  <span>date: </span>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  }).format(new Date(order.createdAt))}
                </div>
                <div>
                  <span>time: </span>
                  {new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                  }).format(new Date(order.createdAt))}
                </div>
              </div>

              <div className="all-product-order gap-3 grid grid-cols-12 mb-5">
                {order.cartItems.map((cart) => (
                  <div
                    key={cart._id}
                    className="card shadow-md rounded-md overflow-hidden col-span-12 md:col-span-6 lg:col-span-2"
                  >
                    <img
                      className="w-full h-48 lg:h-60 object-contain lg:object-cover mb-3"
                      src={cart.product.imageCover}
                      alt={cart.product.title}
                    />
                    <div className="body-card px-3 py-2 space-y-[2px]">
                      <h2 className="font-bold line-clamp-1">
                        {cart.product.title}{' '}
                      </h2>
                      <h3 className="price text-lg font-bold text-primary-500">
                        {cart.price} L.E
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total-price pl-2 text-lg">
                Total Order Price :{' '}
                <span className="text-primary-700 font-bold">
                  {order.totalOrderPrice}
                </span>{' '}
                L.E
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="text-center text-primary-800 font-semibold text-2xl">
          No orders found.
        </div>
      )}
    </>
  );
}
