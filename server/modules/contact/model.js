const mongoose = require('mongoose')
const contactSchema = require('./schema')
const MODEL_NAME = 'userContacts'
const COLLECTION_NAME = 'user-contacts'

const model = mongoose.model(
  MODEL_NAME,
  contactSchema,
  COLLECTION_NAME
)

module.exports = model