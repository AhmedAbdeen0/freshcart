import { NavLink, Link } from "react-router-dom";
import freshCartLogo from "../../assets/imgs/freshcart-logo.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";

export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    getCartProducts();
  }, []);

  function toggleMobileMenu() {
    setIsOpenMenu(prevState => !prevState);
  }

  return (
    <nav className="bg-slate-100 shadow py-3 fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <img src={freshCartLogo} alt="FreshCart Logo" className="h-10" />
        </NavLink>

        {/* Hamburger Button for Mobile */}
        <button className="lg:hidden text-2xl" onClick={toggleMobileMenu}>
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Mobile Menu */}
        <ul
          className={`absolute lg:static top-16 left-0 w-full lg:w-auto bg-slate-100 lg:bg-transparent shadow-lg lg:shadow-none p-5 lg:p-0 transition-all duration-300 ease-in-out ${
            isOpenMenu ? "block" : "hidden"
          } lg:flex gap-6 items-center text-lg`}
        >
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/Brands">Brands</NavLink>
          </li>
          <li>
            <NavLink to="/allorders">Orders</NavLink>
          </li>
          {!token && (
            <>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Right Section (Social Icons, Cart & Auth Buttons) */}
        <div className="flex items-center gap-6">
          {/* Social Media Icons (Hidden on mobile) */}
          <ul className="hidden lg:flex gap-4 items-center text-xl">
            <li>
              <a href="https://instagram.com" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>

          {/* Cart and Authentication Links */}
          <div className="flex items-center gap-6">
            {token ? (
              <Link to="/cart" className="relative">
                <i className="fa-solid fa-cart-shopping cursor-pointer text-2xl"></i>
                <div className="cart-counter absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-xs">
                  {cartInfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                  ) : (
                    <span>{cartInfo.numOfCartItems}</span>
                  )}
                </div>
              </Link>
            ) : (
              <div className="hidden lg:flex gap-4">
                <NavLink to="/signup" className="text-lg">
                  Sign Up
                </NavLink>
                <NavLink to="/login" className="text-lg">
                  Login
                </NavLink>
              </div>
            )}

            {token && (
              <button
                onClick={logOut}
                className="bg-transparent border-none cursor-pointer"
              >
                <i className="fa-solid fa-right-from-bracket text-2xl text-red-600"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}