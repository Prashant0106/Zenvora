import { Link, useNavigate } from "react-router-dom";
import '../styles/Navbar.css'

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    // alert('Logged out successfully');
    navigate('/login');
  };

  return (
    // <nav>
    //   <Link to="/">Home</Link> | 
    //   <Link to="/register">Register</Link> | 
    //   <Link to="/login">Login</Link> | 
    //   <Link to="/profile">Profile</Link> | 
    //   <button onClick={handleLogout}>Logout</button>
    // </nav>
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
      <span className="navbar-logo">Z</span>
      <span>Zenvora</span>
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>
        <Link to="/Categories">Categories</Link>
        <Link to="/profile">My Account</Link>
        <Link to="/cart" className="cart-link">Cart</Link>

        <button className="navbar-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
