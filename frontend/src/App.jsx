import { Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from './components/RegisterPage'
import Home from './pages/Home'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import LoginPage from './components/LoginPage'
import NotFound from './pages/NotFound'
import TodosPage from './components/TodosPage'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/todos' element={<TodosPage/>} />

        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
