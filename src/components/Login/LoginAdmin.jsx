import React, { useState } from 'react';
import axios from 'axios';
import { userState } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUserData, setIsAuthorized } = userState();
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/campus-connect/admin/login', {
        email,
        password,
      }, { withCredentials: true });

      if (response.data.success) {
        setUserData(response.data);
        setIsAuthorized(true); // Set authorization state
        console.log("Admin logged in successfully");
        navigateTo('/allevent')
      }
    } catch (error) {
      setError(error);
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
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button
            onClick={handleSubmit}
            className={`mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
