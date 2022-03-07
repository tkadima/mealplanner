const config = require('./config')
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.database, 
    config.user, 
    config.password,
    {
        host: config.host,
        dialect: "mysql",
        define: {
            timestamps: false
        }
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize= sequelize
db.Food =  require('./food/food.model')(sequelize, Sequelize)

module.exports = db
