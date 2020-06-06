const express = require('express')
const router = new express.Router()
const {
  listContactHandler,
  findContactByName,
  findContactByNumber,
  createNewContact,
  updateContactHandler,
  deleteContactHandler
} = require('../modules/contact')

router.get('/', listContactHandler)

router.get('/name/:name', findContactByName)

router.get('/phone/:phone', findContactByNumber)

router.post('/', createNewContact)

router.put('/', updateContactHandler)

router.delete('/:id', deleteContactHandler)

module.exports = router



