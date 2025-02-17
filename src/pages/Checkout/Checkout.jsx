import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

export default function Checkout() {
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const navigate=useNavigate();
  const[paymentMethod,setPaymentMethod]=useState(null)
// Cach order
  async function createCashOrder(values) {
 let toastId=   toast.loading("We are Creating your order")
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo?.cartId}`,
        method: "POST",
        headers: { token },
        data: values,
      };

      let { data } = await axios.request(options);
     if(data.status==="success"){
        toast.success("Your Order has been Created");
        setTimeout(()=>{
         navigate("/allorders")
        },2000)
     }
    } catch (error) {
      console.error("Error creating order:", error);
    }
    finally{
    toast.dismiss(toastId);
    }
  } 
// online payment order
async function handleOnlinePayment(values) {
    try {
        const options={
            url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
            method:"POST",
            headers:{
                token:token
            },
            data:values
        }
        let {data}=await axios.request(options)
        if(data.status==="success"){
            toast.loading("redirecting you to stripe");
            setTimeout(()=>{
            location.href=data.session.url
            },2000)
        }
    } catch (error) {
        console.log(error);
        
    }
}
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema: Yup.object({
        shippingAddress: Yup.object({
          city: Yup.string()
            .required("City is required")
            .max(50, "City name too long")  // يمكن تغيير الحد الأقصى حسب الحاجة
            .matches(/^[A-Za-z\s]+$/, "City name must be in English"), // التأكد من أن الاسم بالإنجليزية
          phone: Yup.string()
            .required("Phone number is required")
            .matches(
              /^(010|011|012|015)\d{8}$/, 
              "Phone number must be a valid Egyptian number (e.g. 01012345678)"
            ),
          details: Yup.string()
            .required("Address details are required")
            .min(1, "Address is too short")  // يمكنك تغيير الحد الأدنى حسب احتياجك
            .max(200, "Address is too long"),  // تحديد حد أقصى للطول
        }),
      }),
      
    onSubmit: (values)=>{
        if(paymentMethod==="Cash")
        {
          createCashOrder(values);
        }
        else{
            handleOnlinePayment(values)
        }
    },
  });

  return (
    <>
      <section>
        <h1 className="text-xl text-gray-600 font-semibold mb-4">
          Shipping Address
        </h1>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div className="city">
            <input
              type="text"
              className="form-control w-full"
              placeholder="City"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              name="shippingAddress.city"
            />
            {formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city && (
              <div className="text-red-500 text-sm">{formik.errors.shippingAddress.city}</div>
            )}
          </div>
          <div className="Phone">
            <input
              type="tel"
              className="form-control w-full"
              placeholder="Phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              name="shippingAddress.phone"
            />
            {formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone && (
              <div className="text-red-500 text-sm">{formik.errors.shippingAddress.phone}</div>
            )}
          </div>
          <div className="details">
            <textarea
              className="form-control w-full"
              placeholder="Details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              name="shippingAddress.details"
            ></textarea>
            {formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details && (
              <div className="text-red-500 text-sm">{formik.errors.shippingAddress.details}</div>
            )}
          </div>
          <button
          onClick={()=>{
            setPaymentMethod("Cash")
          }}
            type="submit"
            className="btn mr-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            Cash Order
          </button>
          <button
          onClick={()=>{
        setPaymentMethod("Online")
          }}
            type="submit"
            className="btn bg-lime-500 hover:bg-lime-600 text-white font-semibold"
          >
            Online Payment
          </button>
        </form>
      </section>
    </>
  );
}
