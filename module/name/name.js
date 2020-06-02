const path = require('path')
const fs = require('fs')

const dataFilePath = path.join(__dirname, 'name.json')

async function listName(){
    let dataString = fs.readFileSync(dataFilePath, 'utf-8')
    return JSON.parse(dataString)
}


async function createName(newName){
    let list = await listName()
    list.push(newName)
    let dataString = JSON.stringify(list)
    fs.writeFileSync(dataFilePath, dataString)
    return newName
}


module.exports = {
   listName,
   createName
}
