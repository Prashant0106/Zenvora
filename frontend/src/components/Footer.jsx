
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/Footer.css'
import { FaInstagram, FaFacebookF, FaLinkedinIn, } from 'react-icons/fa'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa'
import { SiGooglepay, SiPhonepe, SiPaytm } from 'react-icons/si'

function Footer() {

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setMessage('')

      const response = await axios.post(
        'http://localhost:5000/api/newsletter/subscribe',
        { email }
      )

      setMessage(response.data.message)
      setEmail('')
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <footer className="footer-section">

      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2>Zenvora<span>.</span></h2>
          <p>
            Everything you need, all in one place.
            Discover quality products and enjoy a better
            shopping experience with Zenvora.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/profile">My Profile</Link>
        </div>

        {/* Customer Support */}
        <div className="footer-column">
          <h3>Customer Support</h3>
          <a href="mailto:support@zenvora.com">Contact Us</a>
          <a href="/faq">FAQs</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <h3>Great Deals Start in Your Inbox.</h3>

          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
            </button>
          </form>

          {message && (
            <p className="newsletter-message" role="status">
              {message}
            </p>
          )}
        </div>

        {/* Social Links */}
        {/* <div className="footer-column">
          <h3>Follow Us</h3>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div> */}

      </div>

      {/* Payment Methods */}
      <div className="footer-payment">

        <span>We Accept:</span>

        <div className="payment-icons">
          <FaCcVisa />
          <FaCcMastercard />
          <SiGooglepay />
          <SiPhonepe />
          <SiPaytm />
        </div>

      </div>

      {/* Copyright */}

      <div className="footer-bottom">

        <p>© {new Date().getFullYear()} Zenvora. All rights reserved.</p>

        <div className="footer-socials">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>

          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>

          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>
        </div>

        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

      </div>


    </footer>
  )
}

export default Footer
