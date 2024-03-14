import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = role === 'user' ? 'http://localhost:3344/api/v1/user/signin' : 'http://localhost:3344/api/v1/admin/signin';
    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
      // Reset form fields upon successful signin
      setFormData({ email: '', password: '' });
      // Navigate to the /product page upon successful sign-in
      navigate('/product');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Sign in failed. Please check your credentials.'); // Set error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input id="user" name="role" type="radio" value="user" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" checked={role === 'user'} onChange={() => setRole('user')} />
              <label htmlFor="user" className="ml-2 block text-sm text-gray-900">User</label>
            </div>
            <div className="flex items-center">
              <input id="admin" name="role" type="radio" value="admin" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" checked={role === 'admin'} onChange={() => setRole('admin')} />
              <label htmlFor="admin" className="ml-2 block text-sm text-gray-900">Admin</label>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>} {/* Display error message */}
          <div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
