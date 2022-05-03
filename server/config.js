const { mongoose } = require('mongoose') 

const uri = process.env.ATLAS_URI

mongoose.connect(uri, { useNewUrlParser: true })

const connection = mongoose.connection

module.exports = connection 
