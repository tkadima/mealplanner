const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name: {
        type: string, 
        required: true
    },
    description: String, 
    ingredients: [
        {
            quantity: Number, 
            modifier: String,
            food:Schema.ObjectId
        }
    ],
    instructions: String
})