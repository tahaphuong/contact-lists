const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const router = require('./router')

const app = express()
const port = 9000
const publicPath = path.resolve(__dirname, '../public')

app.use(bodyParser.json())


//routing
app.use('/', express.static(publicPath))


//apis routing
app.use('/api', router)


//error Handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send(err.message)
})

app.listen(port, (err) => {
    if(err){
        console.error(err)
    }
    else{
        console.log('Server opens at port' + port)
    }
})