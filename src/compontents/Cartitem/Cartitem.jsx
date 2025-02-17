import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
export default function CartItem({productInfo}){
    const {count , price, product} = productInfo;

      const {title, imageCover, category,id} = product
    
     let {removeProductFromCart, updateProductCount} =useContext(CartContext)
    return  ( 
    <>
       <div className="flex gap-2"> 
       <div className="card-item grow flex justify-between items-center bg-gray-100 py-4 px-6 rounded-lg"> 
        <img src={imageCover}
        alt={title}
        className="w-24 h-24   object-cover  rounded-full border-4 border-white"
        />

        <h3 className="text-lg text-gray-700 font-semibold">
          <Link to={`/product/${id}`}>
          {title}
          </Link>
            </h3>
        <h4 className="text-gray-500 font-semibold">{category.name}</h4>
        <div className="count flex gap-5 items-center">
            <span className="text-2xl font-bold text-gray-600">{count}</span>
            <div className="icons space-y-2">
                <div 
                onClick={()=>{
                    updateProductCount({productId:id,count:count + 1}) 
                }}
                className="plus w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer">
                <i className="fa-solid fa-plus"></i>
                </div>


                <div
                 onClick={()=>{
                    updateProductCount({productId:id,count:count - 1}) 
                }}
                 className="minus  w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer">
                <i className="fa-solid fa-minus"></i>
                </div>
            </div>
        </div>
        <span>{price}L.E</span>
    </div>
        <button 
        onClick={()=>{
            removeProductFromCart({productId:id})
        } }
        className="rounded-md p-3 bg-gray-100 hover:bg-gray-200 transition-color duration-300">
            <i className="fa-solid fa-xmark"></i>
        </button>
       </div>
    </>
    );
}