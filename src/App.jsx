import React, { useState } from 'react';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Layout from './compontents/Layout/Layout'; 
import ProtectedRoute from './compontents/ProtectedRoute/ProtectedRoute'; 
import GuestRoute from './compontents/GuestRoute/GuestRoute'; 
import UserProvider from './context/User.context';
import CartProvider from './context/Cart.context';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';
import Brands from './compontents/Brands/Brands';
import Categories from './compontents/Categories/Categories';
import Products from './compontents/Products/Products';
import ProductDetails from './compontents/ProductDetails/ProductDetails';


const queryClient = new QueryClient();

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: 'cart', element: <Cart /> },
        { path: 'product/:id', element: <ProductDetails/> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'allorders', element: <Orders /> },
        { path: 'brands', element: <Brands /> },
        { path: 'categories', element: <Categories /> },
        { path: 'products', element: <Products /> },
      ],
    },
    {
      path: '/',
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
