const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
  // userId/token here
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
})

module.exports = contactSchema