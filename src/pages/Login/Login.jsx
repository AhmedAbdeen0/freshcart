// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/User.context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>
);

// App.js
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;

// pages/Login.js
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User.context";

export default function Login() {
  let { setToken } = useContext(UserContext);
  const [inCorrectEmailorPasswordError, setInCorrectEmailorPasswordError] = useState(null);
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
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
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);

      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("User Logged in Successfully");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMsg);
      setInCorrectEmailorPasswordError(errorMsg);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i>Login
      </h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
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
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>
          )}
          {inCorrectEmailorPasswordError && (
            <p className="text-red-500 mt-1 text-sm">*{inCorrectEmailorPasswordError}</p>
          )}
        </div>

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
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.password}</p>
          )}
        </div>

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
