import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom

const Registration = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = role === 'user' ? 'http://localhost:3344/api/v1/user' : 'http://localhost:3344/api/v1/admin';
    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
      setFormData({ name: '', email: '', password: '' }); // Reset form fields
      navigate('/signin'); // Navigate to the signin route upon successful registration
    } catch (error) {
      console.error('Error registering:', error);
      setError('Registration failed. Please try again.'); // Set error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registration</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
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
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
          </div>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already signed up? <Link to="/signin" className="text-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
