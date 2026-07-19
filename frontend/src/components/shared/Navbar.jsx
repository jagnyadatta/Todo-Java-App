// Navbar.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')
  const [hoveredLink, setHoveredLink] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredBtn, setHoveredBtn] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const navigate = useNavigate()
  const { 
    isAuthenticated, 
    user, 
    logout, 
    getUserInitials, 
    getUserName, 
    getUserEmail 
  } = useAuth()

  const navLinks = ['Home', 'Todos', 'About']

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close profile popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-container')) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isProfileOpen])

  const handleLinkClick = (link) => {
    setActiveLink(link)
    setIsMenuOpen(false)
    if (link === "Home") {
      navigate("/")
    } else if (link === "Todos") {
      navigate("/todos")
    } else {
      navigate("/about")
    }
  }

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate('/')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          
          {/* Logo with Gradient */}
          <div 
            className="flex items-center space-x-2 group cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              TodoApp
            </span>
          </div>

          {/* Desktop Navigation - Glass morphism */}
          <div className="hidden md:flex items-center space-x-1 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/50 shadow-sm">
            {navLinks.map((link) => {
              // Hide Todos link if not logged in
              if (link === 'Todos' && !isAuthenticated) return null
              
              return (
                <button
                  key={link}
                  onClick={() => handleLinkClick(link)}
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeLink === link 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    activeLink === link 
                      ? 'bg-black scale-100' 
                      : hoveredLink === link 
                        ? 'bg-black/5 scale-100' 
                        : 'bg-transparent scale-90'
                  }`}></span>
                  
                  <span className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    hoveredLink === link ? 'shadow-[0_0_20px_rgba(0,0,0,0.1)]' : ''
                  }`}></span>
                  
                  <span className="relative z-10">{link}</span>
                </button>
              )
            })}
          </div>

          {/* Desktop Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={() => navigate("/register")}
                  onMouseEnter={() => setHoveredBtn('register')}
                  onMouseLeave={() => setHoveredBtn(null)}
                  className="relative px-5 py-1.5 text-sm font-medium text-gray-700 rounded-full overflow-hidden group transition-all duration-300 hover:shadow-md active:scale-95"
                >
                  <span className="absolute inset-0 bg-black/5 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  <span className="relative">Register</span>
                </button>
                
                <button 
                  onClick={() => navigate("/login")}
                  onMouseEnter={() => setHoveredBtn('login')}
                  onMouseLeave={() => setHoveredBtn(null)}
                  className="relative px-5 py-1.5 text-sm font-medium text-white bg-black rounded-full overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-black/20 active:scale-95"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-gray-800 to-black rounded-full"></span>
                  <span className={`absolute inset-0 bg-white rounded-full transition-all duration-500 ${
                    hoveredBtn === 'login' ? 'opacity-20' : 'opacity-0'
                  }`}></span>
                  <span className="relative">Login</span>
                </button>
              </>
            ) : (
              <div className="relative profile-container">
                {/* Profile Icon */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative flex items-center justify-center w-9 h-9 bg-black rounded-full hover:shadow-lg hover:shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span className="text-white text-sm font-medium">
                    {getUserInitials()}
                  </span>
                </button>

                {/* Profile Popup */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-100/50 overflow-hidden animate-slideDown">
                    <div className="p-5">
                      {/* User Info */}
                      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            {getUserInitials()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-black truncate">
                            {getUserName()}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {getUserEmail()}
                          </p>
                        </div>
                      </div>

                      {/* User Stats */}
                      <div className="py-4 border-b border-gray-100">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center">
                            <p className="text-lg font-bold text-black">1</p>
                            <p className="text-xs text-gray-500">Tasks</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-black">0</p>
                            <p className="text-xs text-gray-500">Completed</p>
                          </div>
                        </div>
                      </div>

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full mt-4 px-4 py-2.5 text-sm font-medium text-white bg-black rounded-xl hover:shadow-lg hover:shadow-black/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center group"
                      >
                        <FaSignOutAlt className="mr-2 group-hover:translate-x-1 transition-transform" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-all active:scale-95"
            >
              <div className="w-5 h-5 relative flex flex-col justify-between">
                <span className={`block w-full h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`block w-full h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block w-full h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100/50 shadow-2xl">
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link, index) => {
              if (link === 'Todos' && !isAuthenticated) return null
              
              return (
                <button
                  key={link}
                  onClick={() => handleLinkClick(link)}
                  className={`w-full px-4 py-3 text-left text-base font-medium rounded-xl transition-all duration-300 relative overflow-hidden group ${
                    activeLink === link 
                      ? 'text-white' 
                      : 'text-gray-700 hover:text-black'
                  }`}
                  style={{
                    animation: isMenuOpen ? `slideIn 0.3s ease-out ${index * 0.05}s forwards` : 'none',
                    opacity: 0,
                    transform: 'translateX(-20px)'
                  }}
                >
                  <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    activeLink === link ? 'bg-black' : 'bg-black/5 opacity-0 group-hover:opacity-100'
                  }`}></span>
                  <span className="relative z-10 flex items-center justify-between">
                    <span>{link}</span>
                    {activeLink === link && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    )}
                  </span>
                </button>
              )
            })}
            
            {/* Mobile Auth Buttons / Profile */}
            <div className="pt-4 border-t border-gray-200/50 space-y-3">
              {!isAuthenticated ? (
                <>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false)
                      navigate("/register")
                    }}
                    className="w-full px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-95"
                  >
                    Register
                  </button>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false)
                      navigate("/login")
                    }}
                    className="w-full px-4 py-3 text-sm font-medium text-white bg-black rounded-xl hover:shadow-lg hover:shadow-black/20 transition-all active:scale-95"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  {/* Mobile User Info */}
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {getUserInitials()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black truncate">
                        {getUserName()}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {getUserEmail()}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false)
                      handleLogout()
                    }}
                    className="w-full px-4 py-3 text-sm font-medium text-white bg-black rounded-xl hover:shadow-lg hover:shadow-black/20 transition-all active:scale-95 flex items-center justify-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx="true">{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  )
}

export default Navbar