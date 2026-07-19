// TodosPage.jsx
import React, { useState, useEffect } from 'react'
import { useTodo } from './contexts/TodoContext'
import { useAuth } from './contexts/AuthContext'
import { FaPlus, FaTrash, FaCheck, FaUndo, FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const TodosPage = () => {
  const { user } = useAuth()
  const { 
    todos, 
    loading, 
    error, 
    fetchTodos, 
    addTodo, 
    toggleTodo, 
    deleteTodo,
    getTodoStats,
    clearError
  } = useTodo()
  
  const [newTodo, setNewTodo] = useState('')
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, completionRate: 0 })
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchTodos()
    }else{
      navigate("/login");
    }
  }, [user])

  useEffect(() => {
    setStats(getTodoStats())
  }, [todos])

  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      const result = await addTodo(newTodo)
      if (result.success) {
        setNewTodo('')
      }
    }
  }

  const handleToggleTodo = async (todoId, description, completed) => {
    await toggleTodo(todoId, description, completed)
  }

  const handleDeleteTodo = async (todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await deleteTodo(todoId)
    }
  }

  if (loading && todos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-black" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">My Todos</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-black">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Completion Rate</p>
          <p className="text-2xl font-bold text-blue-600">{stats.completionRate}%</p>
        </div>
      </div>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} className="flex gap-3 mb-8">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white rounded-xl hover:shadow-xl hover:shadow-black/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
        >
          <FaPlus />
          Add
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={clearError} className="text-red-400 hover:text-red-600">
            ✕
          </button>
        </div>
      )}

      {/* Todos List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-500">No todos yet. Create your first todo!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-center flex-1">
                <button
                  onClick={() => handleToggleTodo(todo.id, todo.description, todo.completed)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mr-4 ${
                    todo.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {todo.completed && <FaCheck className="text-white text-xs" />}
                </button>
                <div>
                  <p className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {todo.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(todo.createdAt).toLocaleDateString()} at{' '}
                    {new Date(todo.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all hover:scale-110"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TodosPage