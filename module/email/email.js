const path = require('path')
const fs = require('fs')

const dataFilePath = path.join(__dirname, 'email.json')


async function listEmail(){
    let dataString = fs.readFileSync(dataFilePath, 'utf-8')
    return JSON.parse(dataString)
}




async function createEmail(newEmail){
    let list = await listEmail()
    list.push(newEmail)
    let dataString = JSON.stringify(list)
    fs.writeFileSync(dataFilePath, dataString)
    return newEmail
}

module.exports = {
    listEmail,
    createEmail,
}