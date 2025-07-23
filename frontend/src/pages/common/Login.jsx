import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userServices';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const response = await loginUser(email, password); // Your API call here

      if (response.status === 'success') {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            toast.success("Login successful");
            console.log(response);

            const role = response.user.userRole;
            if (role === 'TEACHER') navigate('/teacher');
            else if (role === 'ADMIN') navigate('/admin');
            else navigate('/');
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transition duration-300 border border-gray-200 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="sunbeam@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-gray-600 bg-transparent"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-200 "
          >
            Login
          </button>

          <p className="text-center text-sm mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-700 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;