
import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Register.css'


function Register() {
  const [user, setUser] = useState({ name: '', email: '', password: '' })

  const [showPassword, setshowPassword] = useState(false)
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', user);
      // alert(res.data.message)
      setSuccess(res.data.message || 'Account created successfully!')
      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (err) {
      // alert(err.response.data.message);
      setError(
        err.response?.data?.message || 'Registration failed. Please try again'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <h2>Register</h2>
    //   <input placeholder="Name" onChange={e => setUser({ ...user, name: e.target.value })} />
    //   <input placeholder="Email" onChange={e => setUser({ ...user, email: e.target.value })} />
    //   <input type="password" placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} />
    //   <button type="submit">Register</button>
    // </form>
    <main className='register-page'>
      <section className='register-card'>
        <div className='register-brand'>
          <div className='register-logo'>
            A
          </div>
          <span>AuthSpace</span>
        </div>
        <div className='register-heading'>
          <h1>Create your account</h1>
          <p>Join us by entering your details below.</p>
        </div>
        <form onSubmit={handleSubmit} className="regiter-form">
          <div className='register-form-group'>
            <label htmlFor='name'>Full Name</label>
            <input id='name' type='text' placeholder='Enter your full name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })
            } autoComplete='name' required />
          </div>

          <div className='register-form-group'>
            <label htmlFor='register-email'>Email address</label>
            <input id='register-email' type='email' placeholder='you@example.com' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
              autoComplete='email' required />
          </div>

          <div className='register-form-group'>
            <label htmlFor='register-password'>Password</label>

            <div className='register-password-wrapper'>
              <input id='register-password' type={showPassword ? 'text' : 'password'} placeholder='Create a password'
                value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                autoComplete='new-password' required
              />

              <button className='register-password-toggle' type='button' onClick={() => setshowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'show'}
              </button>
            </div>
          </div>

          {error && (<p className='register-message register-success' role='status'>{error}</p>
        )}
        {success && (<p className='register-message register-error' role='status'>{success}</p>)}

        <button type='submit' className='register-button' disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}</button>

        </form>

        <p className='register-footer'>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

      </section>
      <p className='register-copyright'>Create your account securely</p>
    </main>
  )
}

export default Register
