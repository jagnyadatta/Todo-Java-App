// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

// Create the context
const AuthContext = createContext()

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user')
        setUser(null)
        setIsAuthenticated(false)
      }
    }
    setLoading(false)
  }, [])

  // Register function
  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', userData)
      
      // Return success response
      return {
        success: true,
        message: response.data.message || 'Registration successful!',
        data: response.data
      }
    } catch (error) {
      // Handle error response
      let errorMessage = 'Registration failed. Please try again.'
      let fieldErrors = {}
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage
        
        // Handle specific status codes
        if (error.response.status === 409) {
          fieldErrors = {
            email: 'Email already registered. Please use a different email.'
          }
        }
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your connection.'
      }
      
      return {
        success: false,
        message: errorMessage,
        fieldErrors: fieldErrors
      }
    }
  }

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      })
      
      // Check if response has user data
      if (response.data && response.data.data) {
        const userData = response.data.data
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('userId', userData.id)
        localStorage.setItem('userName', userData.name)
        localStorage.setItem('userEmail', userData.email)
        
        // Update state
        setUser(userData)
        setIsAuthenticated(true)
        
        return {
          success: true,
          message: response.data.message || 'Login successful!',
          user: userData
        }
      } else {
        throw new Error('Invalid response structure')
      }
    } catch (error) {
      // Handle error response
      let errorMessage = 'Login failed. Please try again.'
      let fieldErrors = {}
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage
        
        // Handle specific status codes
        if (error.response.status === 401) {
          fieldErrors = {
            password: 'Invalid email or password. Please try again.'
          }
        } else if (error.response.status === 404) {
          fieldErrors = {
            email: 'Account not found. Please register first.'
          }
        }
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your connection.'
      }
      
      return {
        success: false,
        message: errorMessage,
        fieldErrors: fieldErrors
      }
    }
  }

  // Logout function
  const logout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('token')
    
    // Reset state
    setUser(null)
    setIsAuthenticated(false)
  }

  // Update user data (for future use)
  const updateUser = (userData) => {
    if (userData) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      // Update individual fields if present
      if (userData.id) localStorage.setItem('userId', userData.id)
      if (userData.name) localStorage.setItem('userName', userData.name)
      if (userData.email) localStorage.setItem('userEmail', userData.email)
    }
  }

  // Check if user has specific role (for future use)
  const hasRole = (role) => {
    if (!user) return false
    return user.role === role
  }

  // Get user initials
  const getUserInitials = () => {
    if (!user) return 'U'
    const name = user.name || user.userName || 'User'
    const names = name.split(' ')
    if (names.length === 1) return names[0].charAt(0).toUpperCase()
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  // Get full name
  const getUserName = () => {
    if (!user) return 'User'
    return user.name || user.userName || 'User'
  }

  // Get user email
  const getUserEmail = () => {
    if (!user) return ''
    return user.email || user.userEmail || ''
  }

  // Get user ID
  const getUserId = () => {
    if (!user) return null
    return user.id || user.userId || null
  }

  // Context value
  const value = {
    user,
    setUser,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    hasRole,
    getUserInitials,
    getUserName,
    getUserEmail,
    getUserId
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext