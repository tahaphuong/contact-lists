const mongoose = require('mongoose')

// SECURE
const connectionLink = `mongodb+srv://${process.env.MONGO_KEY}:${process.env.MONGO_KEY}@democontactslist-hl8xc.mongodb.net/democontactslist?retryWrites=true&w=majority`

mongoose.connect(connectionLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("connect mongoDB succesful")
})