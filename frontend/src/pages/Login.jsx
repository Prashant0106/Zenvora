import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css'


function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data)
      localStorage.setItem('token', res.data.token)
      // alert('Login successful')
      navigate('/profile')
    } catch (err) {
      // alert(err.response.data.message);
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    // <form onSubmit={handleLogin}>
    //   <h2>Login</h2>
    //   <input placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} />
    //   <input type="password" placeholder="Password" onChange={e => setData({ ...data, password: e.target.value })} />
    //   <button type="submit">Login</button>
    // </form>
    <main className='login-page'>
      <section className='login-card'>
        <div className='login-brand'>
          <div className='login-logo'>A</div>
          <span>AuthSpace</span>
        </div>
        <div className='login-heading'>
          <h1>Welcome back</h1>
          <p>Enter your details to access your account.</p>
        </div>

        <form onSubmit={handleLogin} className='login-form'>
          <div className='form-group'>
            <label htmlFor="email">Email Address</label>
            <input
              id='email' type='email' placeholder='you@example.com' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })
              }
              autoComplete='email' required
            />

          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <div className='password-wrapper'>
              <input id='password' type={showPassword ? 'text' : 'password'} placeholder="Enter ypur password"
                value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })
                }
                autoComplete='current-password' required
              />

              <button type='button' className='password-toggle' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {error && (
            <p className='login-error' role='alert'>{error}</p>
          )}
          <button type='submit' className='login-button' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

        </form>

        <p className='login-footer'>
          Don't have an account?<Link to="/register">Create account</Link>
        </p>

      </section>
      <p className='login-copyright'>
        Secure access tour account
      </p>

    </main>
  )
}

export default Login
