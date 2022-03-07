const config = require('../config')
const mysql = require('mysql2')
const upload = require('../upload')
const Food = require('./food.model')

module.exports = (router) => {   
    const db = require('../models')

    const Food = db.Food
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
            imageFileName: req.file.name
        } 
        let sql = "INSERT INTO food SET ?"
        let query = db.query(sql, food, (err) => {
            if (err) throw err
            res.send({food, file: req.file})
        })
    })



    router.put('/food/', upload.single('imageFile'), (req, res) => {
        const query ="UPDATE food SET name = ?, description = ?, quantity = ?, unit = ?, foodGroup = ?, calories = ?, imageFileName = ? WHERE id = ?"
        db.query(
            query, 
            [req.body.name, req.body.description, req.body.quantity, req.body.unit, 
                req.body.foodGroup, req.body.calories, req.file.filename, req.body.id],
            (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.setHeader('Content-Type', 'application/json')
                    let responseBody = {...req.body, imageFileName: req.file.filename}
                    res.status(200).send(responseBody)
                }
            }
        )
    })

    router.delete('/food/:id', (req, res) => {
        db.query(
            'DELETE FROM food WHERE id = ?', 
            req.params.id, 
            (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send(result)
                }
            }
        )
    })
    
    router.delete('/api/food', (req, res) => {
        db.query(
            'DELETE FROM food',
            (err, result) => {
                if(err){
                    console.log(err)
                }else {
                    res.send(result)
                }
            }
        )
})
}