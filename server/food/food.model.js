module.exports = (sequelize, Sequelize) => {
    let FoodImage = sequelize.define('FoodImage', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        foodId: Sequelize.INTEGER,
        fileSource: Sequelize.STRING
    })

    let Food = sequelize.define('Food', {
        id : {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        name:  Sequelize.STRING,
        description:  Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        unit: Sequelize.STRING,
        foodGroup: Sequelize.STRING,
        calories: Sequelize.INTEGER,
        foodImageId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'foodimages',
                key: 'id'
            }
        },
    })
    return Food
}