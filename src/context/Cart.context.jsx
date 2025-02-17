import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const CartContext = createContext(null);

export default function CartProvider({children}) {

  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);
  const [loading, setLoading] = useState(false); // إضافة حالة التحميل
// Add
  async function addProductToCart({ productId }) {
    let toastId = toast.loading("Adding Product...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart ",
        method: "POST",
        headers: {
          token: token
        },
        data: {
          productId: productId
        }
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
       getCartProducts()
      }

    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  
//Get
  async function getCartProducts() {
    setLoading(true);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token: token,
        },
      };

      let { data } = await axios.request(options);
      console.log(data);

      setCartInfo(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  }
//Remove
 async function removeProductFromCart({productId}){
    let toastId =toast.loading("Deleting Product")
  try {
    const options={
      url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method:"DELETE",
      headers:{
        token:token,
      },
  };
  let {data} =  await axios.request(options);
if (data.status==="success"){
  toast.success("Product has been deleted")
  setCartInfo(data)
}
  
 }catch (error){
  console.log(error);
 }finally {
   toast.dismiss(toastId)
 }
}
// Clear 
 async   function clearCart(){
  let toastId=toast.loading("Clear cart")
 try{
  const options={
    url:"https://ecommerce.routemisr.com/api/v1/cart",
    method:"DELETE",
    headers:{
      token:token,
    }
  };
  let {data}=   await  axios.request(options)
   if(data.message==="success"){
    toast.success("Cart has been cleared")
    setCartInfo({
      numOfCartItems:0
    });
   }
 } catch (error){
  console.log(error);
  
 }finally{
  toast.dismiss(toastId)
 }
  
} 
//Update count
async function updateProductCount({productId,count}) {
   try {
    const options={
      url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method:"PUT",
      headers:{
        token:token,
      },
      data:{
        count:count
      }
    }
    let {data}=await axios.request(options);
    if(data.status==="success"){
      setCartInfo(data)
    }
   }
    catch (error) {
     console.log(error);
     
   }
  
}
  return (
    <CartContext.Provider value={{ addProductToCart,
       getCartProducts, 
       cartInfo, loading,
       removeProductFromCart
    ,clearCart,
    updateProductCount}}>
      {children}
    </CartContext.Provider>
  );
}
