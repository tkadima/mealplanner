const { MongoClient } = require('mongodb')
const db = process.env.ATLAS_URI
const client = new MongoClient(db, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

let _db

module.exports = {
    connectToServer: (callback) => {
        client.connect((err, db) => {
            if (db) {
                _db = db.db('mealPlanner')
                console.log('Successfully connected to MongoDb!')
                return callback(err)
            }
        })
    }, 
    getDb: () => {
        return _db
    }
}
