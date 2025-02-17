import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { object, ref, string } from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [accountExistError, setAccountExist] = useState();

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name cannot be more than 25 characters"),
    email: string()
      .required("Email is required")
      .email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password should be at least 8 characters, include one uppercase, one lowercase, one number, and one special character"
      ),
    rePassword: string()
      .required("Confirm password is required")
      .oneOf([ref("password")], "Passwords must match"),
    phone: string()
      .required("Phone is required")
      .matches(phoneRegex, "Sorry, we accept Egyptian phone numbers only"),
  });

  async function sendDataToRegister(values) {
    const loadingToastId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        setAccountExist(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendDataToRegister,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i>Register Now
      </h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        {/* Name Input */}
        <div className="name">
          <input
            type="text"
            placeholder="Type your name"
            className="form-control w-full"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.name}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="email">
          <input
            type="email"
            placeholder="Email Address"
            className="form-control w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.errors.email && formik.touched.email && !accountExistError && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>
          )}
          {accountExistError && (
            <p className="text-red-500 mt-1 text-sm">*{accountExistError}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="password">
          <input
            type="password"
            placeholder="Password"
            className="form-control w-full"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="re-Password">
          <input
            type="password"
            placeholder="Confirm password"
            className="form-control w-full"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.rePassword}</p>
          )}
        </div>

        {/* Phone Input */}
        <div className="phone">
          <input
            type="text"
            placeholder="Phone number"
            className="form-control w-full"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.phone}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-primary-700 hover:bg-primary-800 text-white"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
