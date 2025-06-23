import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await login(email, password);
        navigate('/');
      } catch (error) {
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center">
      <div className="container-custom max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Brain size={40} className="text-primary-600" />
                <Shield size={20} className="absolute -top-1 -right-1 text-accent-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the ClinicalAI admin dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@clinicalai.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 input-field ${formErrors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 input-field ${formErrors.password ? 'border-red-500' : ''}`}
                />
              </div>
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield size={18} className="mr-2" />
                    Admin Login
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-primary-600 hover:text-primary-800 font-medium">
              ← Back to Homepage
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Admin Access Only</h3>
              <p className="text-xs text-blue-700 mb-3">
                This login is restricted to administrators who can manage blog content and site settings.
              </p>
              <div className="text-xs text-gray-600 bg-white p-2 rounded border">
                <strong>Demo Credentials:</strong><br />
                Email: admin@clinicalai.com<br />
                Password: admin123
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;