
import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Newsletter.css'

function Newsletter() {

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      alert('Please enter your email address')
      return
    }
    try {
      setLoading(true)
      setMessage('')

      const response = await axios.post(
        'http://localhost:5000/api/newsletter/subscribe', { email }
      )
      setMessage(response.data.message)
      setEmail('')
    }
    catch (error) {
      setMessage(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="newsletter-section">

      <div className="newsletter-content">

        <span className="newsletter-tagline">
          STAY CONNECTED
        </span>

        <h2>Stay in the Loop with Zenvora</h2>

        <p>
          Get updates about new arrivals, exciting collections
          and special offers.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>

        </form>
        {message && (
          <p className='newsletter-message' role='status'>
            {message}
          </p>
        )}

        <small>
          Join the Zenvora community.
        </small>

      </div>

    </section>
  )
}

export default Newsletter
