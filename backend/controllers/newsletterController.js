
const Newsletter = require('../models/Newsletter')

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body

    if (typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required'
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      normalizedEmail.length > 254 ||
      !emailRegex.test(normalizedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      })
    }

    const subscriber = await Newsletter.create({
      email: normalizedEmail
    })

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed to Zenvora!',
      subscriber: {
        id: subscriber._id,
        email: subscriber.email
      }
    })

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed'
      })
    }

    console.error('Newsletter subscription error:', error)

    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    })
  }
}

module.exports = { subscribeNewsletter }
