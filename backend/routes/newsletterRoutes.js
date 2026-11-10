
const express = require('express')
const router = express.Router()

const { subscribeNewsletter } = require('../controllers/newsletterController')

// Subscribe to newsletter
router.post('/subscribe', subscribeNewsletter)

module.exports = router
