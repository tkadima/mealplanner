const model = require('../models')
const Food = model.Food

exports.create = (req, res) => {
    let food = { 
        name: req.body.name,
        description: req.body.description, 
        quantity: req.body.quantity, 
        unit: req.body.unit,
        foodGroup: req.body.group, 
        calories: req.body.calories,
    }

    Food.create(food)
    .then(data => {
        res.send(data)
    })
    .catch(e => {
        res.status(500).send({
            message: e.message || 'An error occurred while creating the fridge item'
        })
    })
}

exports.findAll = (req, res) => {
    Food.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        console.error(err)
        res.status(500).send({
            message: err.message || 'Internal error occurred while retrieving fridge items'
        })
    })
}

exports.update = (req, res) => {
    let updateValues = req.body 
    let foodId = req.body.id

    Food.update(updateValues, { where: { id: foodId } })
        .then(result => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).send(req.body)

        })
        .catch(e => {
            res.status(500).send({
                message: e.message || `An error occurred when updating the fridge item with the id ${foodId}`
            })
        })
}

exports.delete = (req, res) => {
    let foodId = req.params.id 

    Food.destroy({ 
        where: {id: foodId }
    })
    .then(result => {
        console.log(result)
        res.send({
            message: `Food with id ${foodId} was deleted successfully!`
        })
    })
    .catch(e => {
        res.status(500).send({
            message: e.message || `An error occurred when trying to delete fridge item with id ${foodId}`
        })
    })
}

exports.deleteAll = (req, res) => {
    Food.destroy({ 
        where: {  }
    })
    .then(result => {
        console.log(result)
        res.send({
            message: 'Successfully deleted all food'
        })
    })
    .catch(e => {
        res.status(500).send({
            message: e.message || 'An error occurred when deleting all fridge items'
        })
    })
}