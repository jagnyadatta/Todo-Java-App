// TodoContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

// Create the context
const TodoContext = createContext()

// Custom hook to use the todo context
export const useTodo = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider')
  }
  return context
}

// Todo Provider component
export const TodoProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null)

  // Base URL for API
  const API_BASE_URL = 'http://localhost:8080/api/todos'

  // Get user ID
  const getUserId = () => {
    if (user) {
      return user.id || localStorage.getItem('userId')
    }
    return localStorage.getItem('userId')
  }

  // Fetch all todos for a user
  const fetchTodos = async () => {
    const userId = getUserId()
    if (!userId) {
      setError('User not authenticated')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`)
      
      if (response.data && response.data.data) {
        setTodos(response.data.data)
        return {
          success: true,
          message: response.data.message || 'Todos fetched successfully!',
          data: response.data.data
        }
      } else {
        throw new Error('Invalid response structure')
      }
    } catch (error) {
      let errorMessage = 'Failed to fetch todos. Please try again.'
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your connection.'
      }
      
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  // Get a single todo
  const getTodo = async (todoId) => {
    const userId = getUserId()
    if (!userId) {
      setError('User not authenticated')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}/${todoId}`)
      
      if (response.data && response.data.data) {
        setSelectedTodo(response.data.data)
        return {
          success: true,
          message: response.data.message || 'Todo fetched successfully!',
          data: response.data.data
        }
      } else {
        throw new Error('Invalid response structure')
      }
    } catch (error) {
      let errorMessage = 'Failed to fetch todo. Please try again.'
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Todo not found.'
        } else {
          errorMessage = error.response.data.message || errorMessage
        }
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your connection.'
      }
      
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  // Add a new todo
  const addTodo = async (description) => {
    const userId = getUserId()
    if (!userId) {
      setError('User not authenticated')
      return
    }

    if (!description || description.trim() === '') {
      setError('Todo description is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/${userId}`, {
        description: description.trim()
      })
      
      if (response.data && response.data.data) {
        // Add the new todo to the existing list
        setTodos(prev => [...prev, response.data.data])
        return {
          success: true,
          message: response.data.message || 'Todo added successfully!',
          data: response.data.data
        }
      } else {
        throw new Error('Invalid response structure')
      }
    } catch (error) {
      let errorMessage = 'Failed to add todo. Please try again.'
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your connection.'
      }
      
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  // Update a todo
  const updateTodo = async (todoId, updatedData) => {
    const userId = getUserId()
    if (!userId) {
      setError('User not authenticated')
      return
    }

    if (!todoId) {
      setError('Todo ID is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.put(`${API_BASE_URL}/${userId}/${todoId}`, updatedData)
      
      if (response.data && response.data.data) {
        // Update the todo in the list
        setTodos(prev => 
          prev.map(todo => 
            todo.id === todoId ? response.data.data : todo
          )
        )
        
        // Update selected todo if it's the same
        if (selectedTodo && selectedTodo.id === todoId) {
          setSelectedTodo(response.data.data)
        }
        
        return {
          success: true,
          message: response.data.message || 'Todo updated successfully!',
          data: response.data.data
        }
      } else {
        throw new Error('Invalid response structure')
      }
    } catch (error) {
      let errorMessage = 'Failed to update todo. Please try again.'
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Todo not found.'
        } else {
          errorMessage = error.response.data.message || errorMessage
        }
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your connection.'
      }
      
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  // Toggle todo completion status
  const toggleTodo = async (todoId, description, currentStatus) => {
    return await updateTodo(todoId, {
      description,
      completed: !currentStatus
    })
  }

  // Delete a todo
  const deleteTodo = async (todoId) => {
    const userId = getUserId()
    if (!userId) {
      setError('User not authenticated')
      return
    }

    if (!todoId) {
      setError('Todo ID is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.delete(`${API_BASE_URL}/${userId}/${todoId}`)
      
      // Remove the todo from the list
      setTodos(prev => prev.filter(todo => todo.id !== todoId))
      
      // Clear selected todo if it's the same
      if (selectedTodo && selectedTodo.id === todoId) {
        setSelectedTodo(null)
      }
      
      return {
        success: true,
        message: response.data.message || 'Todo deleted successfully!',
        data: null
      }
    } catch (error) {
      let errorMessage = 'Failed to delete todo. Please try again.'
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Todo not found.'
        } else {
          errorMessage = error.response.data.message || errorMessage
        }
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your connection.'
      }
      
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  // Clear error
  const clearError = () => {
    setError(null)
  }

  // Clear all todos (useful on logout)
  const clearTodos = () => {
    setTodos([])
    setSelectedTodo(null)
    setError(null)
  }

  // Refresh todos (fetch latest)
  const refreshTodos = async () => {
    return await fetchTodos()
  }

  // Get todo statistics
  const getTodoStats = () => {
    const total = todos.length
    const completed = todos.filter(todo => todo.completed).length
    const pending = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      total,
      completed,
      pending,
      completionRate
    }
  }

  // Get todos by completion status
  const getTodosByStatus = (completed) => {
    return todos.filter(todo => todo.completed === completed)
  }

  // Search todos by description
  const searchTodos = (query) => {
    if (!query || query.trim() === '') {
      return todos
    }
    const searchTerm = query.toLowerCase().trim()
    return todos.filter(todo => 
      todo.description.toLowerCase().includes(searchTerm)
    )
  }

  // Sort todos by date (newest first)
  const sortTodosByDate = (ascending = false) => {
    const sorted = [...todos].sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return ascending ? dateA - dateB : dateB - dateA
    })
    setTodos(sorted)
    return sorted
  }

  // Sort todos by completion status (pending first)
  const sortTodosByStatus = () => {
    const sorted = [...todos].sort((a, b) => {
      if (a.completed === b.completed) return 0
      return a.completed ? 1 : -1
    })
    setTodos(sorted)
    return sorted
  }

  // Context value
  const value = {
    todos,
    setTodos,
    loading,
    error,
    selectedTodo,
    setSelectedTodo,
    fetchTodos,
    getTodo,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearError,
    clearTodos,
    refreshTodos,
    getTodoStats,
    getTodosByStatus,
    searchTodos,
    sortTodosByDate,
    sortTodosByStatus,
    getUserId
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext