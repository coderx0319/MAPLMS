import React, { useContext, useEffect, useState } from 'react';
import validateForm from './validate';
// Assuming validate.jsx is correctly implemented
import { HiEye, HiEyeOff } from 'react-icons/hi'; 


import axios from 'axios';
import { Navigate, useNavigate ,NavLink} from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [token, setToken] = useState("");
  const [user_id, setUID] = useState(0);
  const [usertype, setUserType] = useState(0);
  const [isRegister, setIsRegister] = useState(-1);
  
  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      const uid = window.localStorage.getItem("uid");
      const user_type = window.localStorage.getItem("user_type");
      const isRegister = window.localStorage.getItem("isregister");

      if (storedToken && uid && user_type && isRegister) {
        setUID(parseInt(uid));
        setUserType(parseInt(user_type));
        setIsRegister(parseInt(isRegister));
      }
    }
  }, []);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [err,setErr] =useState(null);
  const [showSignUp,setShowSignUp] =useState(false);
  const [islogin,setLogin]=useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try{
        const res= await api.post(`api/login`,{email:formData.email,password:formData.password});
        const uid=window.localStorage.setItem("uid",res.data.uid);
        const token=window.localStorage.setItem('token',res.data.token);
        const user_type=window.localStorage.setItem('user_type',res.data.user_type);
        const isregister=window.localStorage.setItem('isregister',res.data.isregister)
 
        setLogin(true);
        navigate("/");
        window.location.reload()
        
      }
      catch{
       setErr(err.response.data);
      } // Replace with actual sign in logic
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  if(showSignUp){
    navigate("/register")
  }
  const handleSignUpClick = () => {
   setShowSignUp(true)
  }



  
 
 


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back!</h1>
        <h3 className="text-sm text-gray-600 mb-4">Please enter your credentials to sign in.</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <HiEye /> : <HiEyeOff />}
            </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
            <div>
              <a href="/" className="text-sm text-blue-500 hover:text-blue-700">
                Forgot password?
              </a>
            </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Submit
              </button>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <NavLink
              to="/register"
              type="button"
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              Sign Up
            </NavLink>
            {err && <p className='text-red-500 text-sm'>{err}</p>}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;