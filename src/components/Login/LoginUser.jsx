import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';


function LoginPage() {
  const [loginType, setLoginType] = useState('rollnum');
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/campus-connect/user/login', {
        [loginType]: loginValue,
        password,
      },{withCredentials:true});
      console.log(response.data);
      toast.success("Login Successfully");
      navigateTo('/allpost')
      // Handle successful login
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-fit justify-center ">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md flex flex-col lg:flex-row">
        <div className="lg:w-1/2 lg:h-96 md:h-48 sm:h-36 h-24">
          <img
            src="/login.jpg"
            alt="Login Image"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="lg:w-1/2 p-4 lg:p-8">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-type">
                Login Type
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="login-type"
                value={loginType}
                onChange={(e) => setLoginType(e.target.value)}
              >
                <option value="rollnum">Roll Number</option>
                <option value="email">Email</option>
                <option value="username">Username</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-value">
                {loginType === 'rollnum' ? 'Roll Number' : loginType === 'email' ? 'Email' : 'Username'}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="login-value"
                type={loginType === 'email' ? 'email' : 'text'}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;