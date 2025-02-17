import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.context";

export default function Login() {
  // استخدام السياق لإدارة حالة التوكن
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // التحقق من صحة البيانات
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const validationSchema = object({
    email: string().required("Email is required").email("Invalid email address"),
    password: string()
      .required("Password is required")
      .matches(passwordRegex, "Password must be strong"),
  });

  // إرسال البيانات إلى الخادم
  async function handleLogin(values) {
    const loadingToast = toast.loading("Logging in...");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred!";
      setError(message);
      toast.error(message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  // إدارة النموذج باستخدام Formik
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* إدخال البريد الإلكتروني */}
          <div>
            <label className="block mb-1 font-semibold text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* إدخال كلمة المرور */}
          <div>
            <label className="block mb-1 font-semibold text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* عرض خطأ تسجيل الدخول */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* زر تسجيل الدخول */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
