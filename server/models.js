const config = require('./config')
const Sequelize = require('sequelize');

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

const model = {}

model.Sequelize = Sequelize
model.sequelize= sequelize
model.Food =  require('./food/food.model')(sequelize, Sequelize)
model.FoodImage = require('./foodImage/foodImage.model')(sequelize, Sequelize)

module.exports = model
