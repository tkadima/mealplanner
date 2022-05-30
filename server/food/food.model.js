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
    nutrition: {
        totalFat: Number, 
        saturatedFat: Number, 
        transFat: Number, 
        cholesterol: Number, 
        totalCarb: Number, 
        dietaryFiber: Number,
        sugar: Number, 
        protein: Number,
        vitaminD: Number, 
        calcium: Number, 
        iron: Number, 
        potassium: Number   
    }
})

const Food = mongoose.model('food', FoodSchema)

module.exports = Food