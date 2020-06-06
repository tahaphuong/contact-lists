const express = require('express')
const router = new express.Router()
const {
  getListContacts,
  findContactByName,
  findContactByNumber,
  createNewContact,
  updateContactHandler,
  deleteContactHandler
} = require('../modules/contact')

router.get('/', getListContacts)

router.get('/name/:name', findContactByName)

router.get('/phone/:phone', findContactByNumber)

router.post('/', createNewContact)

router.put('/', updateContactHandler)

router.delete('/:id', deleteContactHandler)

module.exports = router



