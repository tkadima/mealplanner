const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(express.static('uploads/images'));


if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const db = require('./models')
db.sequelize.sync()

var router = require('./routes')();
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})