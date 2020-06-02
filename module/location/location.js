const path = require('path')
const fs = require('fs')

const dataFilePath = path.join(__dirname, 'location.json')


async function listLocation(){
    let dataString = fs.readFileSync(dataFilePath, 'utf-8')
    return JSON.parse(dataString)
}




async function createLocation(newLocation){
    let list = await listLocation()
    list.push(newLocation)
    let dataString = JSON.stringify(list)
    fs.writeFileSync(dataFilePath, dataString)
    return newLocation
}

module.exports = {
    listLocation,
    createLocation,
}