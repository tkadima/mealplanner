const express = require('express'); 

const appRoutes = () => {
    const router = express.Router(); 
    const food = require('./food/food.routes')(router)
    return router
}

module.exports = appRoutes