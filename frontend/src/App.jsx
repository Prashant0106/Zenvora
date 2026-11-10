import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import Home from './pages/Home'
import { CartProvider } from './context/CartContext'
import Cart from './pages/Cart'
import Footer from './components/Footer'
// import '../src/index.css'

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App
