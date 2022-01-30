'use strict'

var db = require('../../server/index')

var Food = (food) => {
    this.name = food.name
    this.description = food.description, 
    this.quantity = food.quantity, 
    this.unit = food.unit, 
    this.foodGroup = food.foodGroup,
    this.calories = food.calories,
    this.imageUrl = food.imageUrl
}