const express = require('express')

const router = new express.Router()

// contact routes
const apiProductRouter = require('./api-contact-router')
router.use('/api/contact', apiProductRouter)

module.exports = router