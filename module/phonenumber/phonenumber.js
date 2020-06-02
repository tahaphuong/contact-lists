const path = require('path')
const fs = require('fs')

const dataFilePath = path.join(__dirname, 'phonenumber.json')

/** 
* @summary read all products in file then return
*/

async function listPhoneNumber(){
    let dataString = fs.readFileSync(dataFilePath, 'utf-8')
    return JSON.parse(dataString)
}

/** 
* @summary add newNumber to list Products, overwrite list products to file
* @param {{}} newNumber
*/



async function createNumber(newNumber){
    let list = await listPhoneNumber()
    list.push(newNumber)
    let dataString = JSON.stringify(list)
    fs.writeFileSync(dataFilePath, dataString)
    return newNumber
}

module.exports = {
    listPhoneNumber,
    createNumber,
}