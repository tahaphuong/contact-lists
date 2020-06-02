const express = require ('express')


const router = new express.Router()
const { listName, createName } = require('./module/name/name.js')
const { listPhoneNumber, createNumber } = require('./module/phonenumber/phonenumber.js')
const { listEmail, createEmail } = require('./module/email/email.js')
const { listLocation, createLocation } = require('./module/location/location.js')

router.get('/name', async (req, res, next)=>{
    try{
        let names = await listName()
        res.json(names)
    } catch(err){
        next(err)
    }
    
})

router.post('/name', async (req,res, next)=>{
    try{
        let newName = req.body
        let createdName = await createProduct(newName)
        res.json(createdName)
    } catch(err){
        next(err)
    }
})

router.get('/phonenumber', async (req, res, next)=>{
    try{
        let numbers = await listPhoneNumber()
        res.json(numbers)
    } catch(err){
        next(err)
    }
    
})

router.post('/phonenumber', async (req,res, next)=>{
    try{
        let newNumber = req.body
        let createdNumber = await createProduct(newNumber)
        res.json(createdNumber)
    } catch(err){
        next(err)
    }
})

router.get('/email', async (req, res, next)=>{
    try{
        let emails = await listEmail()
        res.json(emails)
    } catch(err){
        next(err)
    }
    
})

router.post('/email', async (req,res, next)=>{
    try{
        let newEmail = req.body
        let createdEmail = await createProduct(newEmail)
        res.json(createdEmail)
    } catch(err){
        next(err)
    }
})

router.get('/location', async (req, res, next)=>{
    try{
        let locations = await listLocation()
        res.json(locations)
    } catch(err){
        next(err)
    }
    
})

router.post('/location', async (req,res, next)=>{
    try{
        let newLocation = req.body
        let createdLocation = await createProduct(newLocation)
        res.json(createdLocation)
    } catch(err){
        next(err)
    }
})



module.exports = router
