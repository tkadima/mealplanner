const config = require('../config')
const mysql = require('mysql2')
const upload = require('../upload')
const Food = require('./food.model')
const { Exception } = require('sass')

module.exports = (router) => {   
    const model = require('../models')

    const Food = model.Food
    router.get('/food', (req, res) => {
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
    
    })

    router.post('/food/new', upload.single('imageFile'), (req, res) => {
        let food = { 
            name: req.body.name,
            description: req.body.description, 
            quantity: req.body.quantity, 
            unit: req.body.unit,
            foodGroup: req.body.group, 
            calories: req.body.calories,
            foodImageId: req.file.name
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
    })



    router.put('/food/', upload.single('imageFile'), (req, res) => {
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
    })

    router.delete('/food/:id', (req, res) => {
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

    })
    
    router.delete('/food', (req, res) => {
       /* db.query(
            'DELETE FROM food',
            (err, result) => {
                if(err){
                    console.log(err)
                }else {
                    res.send(result)
                }
            }
        )*/ 

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
    }) 
}