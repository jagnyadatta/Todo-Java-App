// NotFound.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaArrowLeft, FaQuestionCircle, FaSearch, FaExclamationTriangle } from 'react-icons/fa'

const NotFound = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  // Mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center px-4 py-12 overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-black/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-black/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-2xl w-full text-center">
        
        {/* 404 Number with Animation */}
        <div 
          className="mb-8 relative"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        >
          <div className="text-[120px] sm:text-[150px] md:text-[180px] font-bold leading-none relative">
            <span className="bg-linear-to-r from-black to-gray-700 bg-clip-text text-transparent animate-pulse">
              4
            </span>
            <span 
              className="relative inline-block mx-2"
              style={{
                animation: 'spin 8s linear infinite'
              }}
            >
              <span className="bg-linear-to-r from-black to-gray-700 bg-clip-text text-transparent">
                0
              </span>
            </span>
            <span className="bg-linear-to-r from-black to-gray-700 bg-clip-text text-transparent animate-pulse">
              4
            </span>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-black/5 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-black/5 rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Error Message */}
        <div 
          className="mb-8"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaExclamationTriangle className="text-2xl text-black/70" />
            <h1 className="text-3xl sm:text-4xl font-bold text-black">
              Page Not Found
            </h1>
          </div>
          
          <p className="text-gray-600 text-lg mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 text-sm">
            It might have been moved or deleted.
          </p>
        </div>

        {/* Search Box (visual only) */}
        <div 
          className="relative max-w-sm mx-auto mb-8"
          style={{
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
          }}
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 group-hover:text-black transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for what you're looking for..."
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none transition-all duration-300 hover:shadow-lg"
              readOnly
            />
            <div className="absolute inset-0 rounded-2xl border-2 border-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        >
          <button
            onClick={() => navigate(-1)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="px-8 py-3.5 bg-white text-black border-2 border-black rounded-xl font-medium hover:bg-black hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-black/20 active:scale-95 flex items-center justify-center group"
          >
            <FaArrowLeft className={`mr-2 transition-transform duration-300 ${
              isHovered ? '-translate-x-1' : ''
            }`} />
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="px-8 py-3.5 bg-black text-white rounded-xl font-medium hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center group"
          >
            <FaHome className={`mr-2 transition-transform duration-300 ${
              isHovered ? '-translate-y-0.5' : ''
            }`} />
            Go Home
          </button>
        </div>

        {/* Countdown */}
        <div 
          className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-400"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
          }}
        >
          <span>Redirecting to homepage in</span>
          <span className="font-bold text-black bg-gray-100 px-3 py-1 rounded-full min-w-10">
            {countdown}s
          </span>
        </div>

        {/* Help Link */}
        <div className="mt-6">
          <button 
            onClick={() => navigate('/contact')}
            className="text-sm text-gray-400 hover:text-black transition-colors flex items-center justify-center space-x-1"
          >
            <FaQuestionCircle className="text-xs" />
            <span>Need help? Contact support</span>
          </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx="true">{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}

export default NotFound