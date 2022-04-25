const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const path = require('path')

const PORT = process.env.PORT || 3001

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.use(cors())
app.use(express.json())
app.use(express.static('uploads/images'));


if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


var appRoutes = require('./routes')
app.use('/', appRoutes)

const db = require('./config')


app.listen(PORT, () => {
    db.connectToServer((err) =>  {
      if (err) console.error(err)
    })
    console.log(`Server listening on port ${PORT}`)
})