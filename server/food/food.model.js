const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    description: String, 
    quantity: {
        type: Number,
        required: true,
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

module.exports = Food = mongoose.model('Food', FoodSchema)