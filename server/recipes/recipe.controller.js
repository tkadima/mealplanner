const model = require('../models')
const Recipe = model.Recipe

exports.create = (req, res) => {
    let recipe = { 
        name: req.body.name,
        description: req.body.description, 
        ingredients: req.body.ingredients, 
        instructions: req.body.instructions,
    }

    Recipe.create(recipe)
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
    Recipe.findAll()
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
    let recipeId = req.body.id

    Recipe.update(updateValues, { where: { id: recipeId } })
        .then(result => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).send(req.body)

        })
        .catch(e => {
            res.status(500).send({
                message: e.message || `An error occurred when updating the fridge item with the id ${recipeId}`
            })
        })
}

exports.delete = (req, res) => {
    let recipeId = req.params.id 

    Recipe.destroy({ 
        where: {id: recipeId }
    })
    .then(result => {
        console.log(result)
        res.send({
            message: `Recipe with id ${recipeId} was deleted successfully!`
        })
    })
    .catch(e => {
        res.status(500).send({
            message: e.message || `An error occurred when trying to delete fridge item with id ${recipeId}`
        })
    })
}

exports.deleteAll = (req, res) => {
    Recipe.destroy({ 
        where: {  }
    })
    .then(result => {
        console.log(result)
        res.send({
            message: 'Successfully deleted all the recipes'
        })
    })
    .catch(e => {
        res.status(500).send({
            message: e.message || 'An error occurred when deleting all the recipes'
        })
    })
}