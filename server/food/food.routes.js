const upload = require('../../upload')
const path = require('path')
const express = require('express')
var fs = require('fs');

const router = express()

let Food = require('./food.model')


// @route: GET api/food 
// @description: get all food 
// @access: Public 
router.get('/food', (req, res) => {
    Food.find()
        .then(food => res.json(food))
        .catch(e => res.status(500).send('An error occured', e))
})

// @route: POST api/food 
// @description: add and save new food 
// @access: Public 
router.post('/food', upload.single('imageFile'), (req, res, next) => {
    console.log('dirname', __dirname)
    var food = {
        name: req.body.name, 
        description: req.body.description, 
        quantity: req.body.quantity, 
        unit: req.body.unit,
        foodGroup: req.body.group, 
        calories: req.body.calories,
        foodImage: {
            filename: req.file.filename,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/images/' + req.file.filename)),
                contentType: 'image'
            }
        }
    }
    console.log('food', food)

    Food.create(food, (err, item) => {
        if (err) console.log(error)
        else {
            res.redirect('/')
        }
    })
})

// @route: PUT api/food/:id
// @description: update food with given id 
// @access: Public 

router.put('/food/:id', upload.single('imageFile'), (req, res, next) => {
    console.log("updating existing food id ", req.params.id)
    // update file if statement 
    Food.findByIdAndUpdate(req.params.id, req.body)
        .then(food => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database', err })
        );
})

// @route: DELETE api/food/:id
// @description: delete food with given id 
// @access: Public 
router.delete('/food/:id', (res, req) => {
    console.log("deleting existing food id ", req.params.id)
    Food.findByIdAndRemove(req.params.id, req.body)
        .then(food => res.json({ message: 'Food deleted successfully!'}))
        .catch(err => res.status(404).json({ error: err}))
})

// @route: DELETE api/food/
// @description: delete all food 
// @access: Public 
router.delete('/food', (res, req) => {
    console.log("deleting all food", req.params.id)
    Food.remove({}, callback)
        .then(food =>  res.json({ message: 'All food deleted'}))
        .catch(err => res.status(404).json({ error: err}))
})

module.exports = router