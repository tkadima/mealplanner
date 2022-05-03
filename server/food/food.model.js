const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    description: String, 
    quantity: {
        type: Number,
        min: 0
    }, 
    unit: String,
    foodGroup: String, 
    calories: {
        type: Number, 
        min: 0
    },
    foodImage: {
        filename: String, 
        img: 
        {
            data: Buffer,
            contentType: String
        } 
        
    }
})

const Food = mongoose.model('food', FoodSchema)

module.exports = Food