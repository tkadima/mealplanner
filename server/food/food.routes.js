const upload = require('../upload')
const path = require('path')

const Food = require('./food.model')

module.exports = (router) => {
    
    // @route: GET api/food 
    // @description: get all food 
    // @access: Public 
    router.get('/api/food', (req, res) => {
        Food.find()
            .then(food => res.json(food))
            .catch(e => res.status(500).send('An error occured', e))
    })

    // @route: POST api/food 
    // @description: add and save new food 
    // @access: Public 
    router.post('/food/', upload.single('imageFile'), (req, res, next) => {
        console.log("adding a new food")
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
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: req.file.mimetype
                }
            }
        }

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

    router.put('/:id', upload.single('imageFile'), (req, res, next) => {
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
    router.delete('/:id', (res, req) => {
        console.log("deleting existing food id ", req.params.id)
        Food.findByIdAndRemove(req.params.id, req.body)
            .then(food => res.json({ message: 'Food deleted successfully!'}))
            .catch(err => res.status(404).json({ error: err}))
    })

    // @route: DELETE api/food/
    // @description: delete all food 
    // @access: Public 
    router.delete('/', (res, req) => {
        console.log("deleting all food", req.params.id)
        Food.remove({}, callback)
            .then(food =>  res.json({ message: 'All food deleted'}))
            .catch(err => res.status(404).json({ error: err}))
    })
}