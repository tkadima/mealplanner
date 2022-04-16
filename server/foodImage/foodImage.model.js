const model = require('../models')

module.exports = (sequelize, Sequelize) => {
    let FoodImage = sequelize.define('FoodImage', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        foodId: Sequelize.INTEGER,
        fileSource: Sequelize.STRING
    })
    return FoodImage
}