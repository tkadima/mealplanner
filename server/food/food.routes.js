const upload = require('../upload')

module.exports = (router) => {   
    const food = require('../food/food.controller')

    router.get('/food', food.findAll)

    router.post('/food/new', upload.single('imageFile'), food.create)

    router.put('/food/', upload.single('imageFile'), food.update)

    router.delete('/food/:id', food.delete)
    
    router.delete('/food', food.deleteAll)
}