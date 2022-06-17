const express = require('express')
const router = express()

let Recipe = require('./recipe.model')

// @route: GET api/recipes
// @description: get all the recipes 
// @access: Public 
router.get('/recipes', (req, res) => {
    Recipe.find()
        .then(recipe => res.json(recipe))
        .catch(e => res.status(500).send('An error occured', e))
})

// @route: POST api/recipes 
// @description: add and save a new recipe 
// @access: Public 
router.post('/recipes', (req, res) => {
    var recipe = new Recipe({
        name: req.body.name, 
        description: req.body.description, 
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    })
    
    Recipe.create(recipe)
        .then(f => res.json(recipe))
        .catch(err => res.status(400).json({ error: 'Unable to add this recipe' }));
})

// @route: PUT api/recipes/:id
// @description: update recipe with given id 
// @access: Public 

router.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body)
        .then(recipe => {
            let patch = req.body
            let newRecipe = recipe 
            for(let property in patch) {
                if (property != 'id') {
                    newRecipe[property] = patch[property]
                }
            }
            res.json(newRecipe)
        })
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database', err })
        );
})

// @route: DELETE api/recipes/:id
// @description: delete recipe with given id 
// @access: Public 
router.delete('/recipes/:id', (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, req.body)
        .then(recipe => res.json({ message: 'Recipe deleted successfully!'}))
        .catch(err => res.status(404).json({ error: err}))
})

// @route: DELETE api/recipes/
// @description: delete all recipes 
// @access: Public 
router.delete('/recipes', (req, res) => {
    Recipe.deleteMany()
        .then(recipe =>  res.json({ message: 'All recipes deleted'}))
        .catch(err => res.status(400).json({error: err}))
})

module.exports = router