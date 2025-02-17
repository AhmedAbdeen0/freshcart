import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User.context";

export default function Login() {

  let {setToken}     =   useContext(UserContext)
  const [inCorrectEmailorPasswordError, setInCorrectEmailorPasswordError] = useState(null);
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = object({
    email: string()
      .required("Email is required")
      .email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password should be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  async function sendDataToLogin(values) {
    const loadingToastId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
console.log(data);

      if (data.message === "success") {
         localStorage.setItem("token" ,data.token);
      setToken(data.token)
        toast.success("User Logged in Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        setInCorrectEmailorPasswordError(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i>Login
      </h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
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
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>
          )}
          {inCorrectEmailorPasswordError && (
            <p className="text-red-500 mt-1 text-sm">*{inCorrectEmailorPasswordError}</p>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-primary-700 hover:bg-primary-800 text-white"
        >
          Login
        </button>
      </form>
    </>
  );
}
