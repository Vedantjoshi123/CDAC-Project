import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { insertData } from '../../services/userServices';
import { AppContext } from '../../context/AppContext';


function Register() {
    const { login } = useContext(AppContext); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        userRole: 'STUDENT',
    });
    const[error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

     const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const { firstName, lastName, email, password, dob, userRole, confirmPassword} = formData;

        if (!firstName || !lastName || !email || !password || !dob || !userRole || !confirmPassword) {
            toast.error("All fields are required");
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("Enter a valid email address");
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password)) {
            toast.error("Password must be at least 6 characters long and include uppercase, lowercase, number, and special character");
        } else if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            const response = await insertData(firstName, lastName, email, password, dob, userRole);
             if (response.message === "success") {
                toast.success("Registration done successfully!");

                const registeredUser = response.user;
                const jwtToken = response.token;

                if (registeredUser && jwtToken) {
                  login(registeredUser, jwtToken); // ✅ global login
                  // Navigate by role
                  const role = registeredUser.userRole || registeredUser.role;
                  if (role === "STUDENT") navigate("/student");
                  else if (role === "TEACHER") navigate("/teacher");
                  else if (role === "ADMIN") navigate("/admin");
                  else navigate("/login"); // fallback
                } else {
                  toast.error("Missing user data or token from server");
                }

              } else {
                toast.error(response.message || "Registration failed");
              }

        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-md  border-black rounded-xl p-8 mt-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-600 bg-transparent "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-3 right-3 text-gray-600 bg-transparent "
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* DOB */}
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md"
            required
          />

          {/* Role Dropdown */}
          <select
            name="userRole"
            value={formData.userRole}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md"
            required
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
          >
            Register
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Login Redirect */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register