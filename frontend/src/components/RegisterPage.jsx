// RegisterPage.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaCheckCircle,
  FaTimes,
  FaSpinner
} from 'react-icons/fa'
import { useAuth } from './contexts/AuthContext'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register, isAuthenticated } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  })
  const [countdown, setCountdown] = useState(3)
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos')
    }
  }, [isAuthenticated, navigate])

  // Handle countdown for redirect
  useEffect(() => {
    let timer
    if (toast.show && toast.type === 'success') {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [toast.show, toast.type])

  // Handle redirect after countdown
  useEffect(() => {
    if (countdown === 0 && isRedirecting) {
      navigate('/login')
    }
  }, [countdown, isRedirecting, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    })
    
    if (result.success) {
      setToast({
        show: true,
        message: result.message || 'Registration successful! Redirecting to login...',
        type: 'success'
      })
      setCountdown(3)
      setIsRedirecting(true)
      setLoading(false)
    } else {
      setLoading(false)
      if (result.fieldErrors) {
        setErrors(result.fieldErrors)
      }
      setToast({
        show: true,
        message: result.message,
        type: 'error'
      })
    }
  }

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }))
    setCountdown(3)
    setIsRedirecting(false)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center px-4 py-12">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 max-w-md w-full transform transition-all duration-500 animate-slideInRight`}>
          <div className={`rounded-2xl shadow-2xl overflow-hidden ${
            toast.type === 'success' ? 'bg-white border-l-4 border-green-500' : 'bg-white border-l-4 border-red-500'
          }`}>
            <div className="p-4">
              <div className="flex items-start">
                <div className="shrink-0">
                  {toast.type === 'success' ? (
                    <FaCheckCircle className="text-green-500 text-xl" />
                  ) : (
                    <FaTimes className="text-red-500 text-xl" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-800">{toast.message}</p>
                  {toast.type === 'success' && (
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full transition-all duration-1000"
                          style={{ width: `${(countdown / 3) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs font-medium text-gray-600 min-w-5">
                        {countdown}s
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={closeToast}
                  className="ml-4 shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Form */}
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/5 p-8 md:p-10 border border-gray-100/50 backdrop-blur-sm">
          
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-all duration-300">
                <span className="text-white font-bold text-xl">T</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-black mb-2">Create Account</h2>
            <p className="text-gray-500 text-sm">
              Join TodoApp and start organizing your tasks
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className={`text-gray-400 transition-colors duration-300 ${
                      errors.name ? 'text-red-500' : 'group-focus-within:text-black'
                    }`} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:ring-black/20'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center">
                    <FaTimes className="mr-1 text-xs" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className={`text-gray-400 transition-colors duration-300 ${
                      errors.email ? 'text-red-500' : 'group-focus-within:text-black'
                    }`} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:ring-black/20'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center">
                    <FaTimes className="mr-1 text-xs" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className={`text-gray-400 transition-colors duration-300 ${
                      errors.password ? 'text-red-500' : 'group-focus-within:text-black'
                    }`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:ring-black/20'
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center">
                    <FaTimes className="mr-1 text-xs" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className={`text-gray-400 transition-colors duration-300 ${
                      errors.confirmPassword ? 'text-red-500' : 'group-focus-within:text-black'
                    }`} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:ring-black/20'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center">
                    <FaTimes className="mr-1 text-xs" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 bg-black text-white font-medium rounded-xl transition-all duration-300 ${
                loading 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:shadow-xl hover:shadow-black/20 hover:scale-[1.02] active:scale-95'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-black font-medium hover:underline transition-all hover:scale-105 inline-block"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default RegisterPage