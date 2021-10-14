import { useState, useEffect} from 'react';
import _ from 'lodash'
import { Header } from 'semantic-ui-react'

import Calendar from './Calendar'
import RecipeForm from './RecipeForm'

const Planner = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const meals = ['Breakfast', 'Lunch', 'Dinner']

    const initializeData = () => {
        let mealData = {}
        daysOfWeek.forEach(day => {
            meals.forEach(meal => {
                if (!mealData[day])  {
                    mealData[day] = {}
                }
                mealData[day][meal] = []
            })
        })
        return mealData
    } 

    const [data, setData] = useState(() => initializeData());
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState('')
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedRecipe, setSelectedRecipe] = useState({})
    const [op, setOp] = useState('')
    const [errors, setErrors] = useState({})
    //const [dayAnalysis, setDayAnalysis] = useState(null) 

    const addRecipe = (title, ingredients) => {
        let newData = {...data}
        newData[selectedDay][selectedMeal].push({title, ingredients})
        setData(newData) 

        let newRecipe = {...selectedRecipe }
        newRecipe.title = title
        newRecipe.ingredients = ingredients
        setSelectedRecipe(newRecipe)
        
       

        /**
         * Add a summary to meal so that the data looks like :
         *  {...Monday: {Breakfast: {title: scrambled, eggs, ingredients: [2 eggs, butter], analysis: {calories: 200...}}}}
         * create new state called nutrientsPerDay {Day: { Calories: 100, Protein: 1mg, ...}}
         * pass ingredients to api, input response to nutrientsPerDay
         * display nutrients per day on footer of table 
         */

    }

    const editRecipe = (title, ingredients) => {
        let index = _.findIndex(data[selectedDay][selectedMeal], (recipe) => { return recipe.title === title})
        _.set(data, `${selectedDay}.${selectedMeal}[${index}].ingredients`, ingredients)
    }

    const handleDeleteRecipe = (title) => {
        setShowModal(false)
        let index = _.findIndex(data[selectedDay][selectedMeal], (recipe) => { return recipe.title === title})
        if (index > -1) {
            data[selectedDay][selectedMeal].splice(index, 1)
        }
        setData(data)
    }

    const handleSelectMeal = (day, meal, operation) => {
        setShowModal(true)
        setSelectedMeal(meal)
        setSelectedDay(day)
        setOp(operation.op)
        let recipe = operation.op === 'edit' ? operation.recipe : null; 
        setSelectedRecipe(recipe) 
    }

    const formIsValid = (title, ingredients, isDropdownSelected) => {
        let formErrors = {}
        let recipes = getRecipes()

        if (!title) {
            formErrors.title = 'Title cannot be empty'
        }

        if(!ingredients) {
            formErrors.ingredients = 'Ingredients cannot be empty'
        }

        if (recipes.hasOwnProperty(title) && op === 'add' && !isDropdownSelected) {
            formErrors.title = 'Title is already saved. Either choose another title or select it from dropdown'
        }

        setErrors(formErrors)
        return _.isEmpty(formErrors)
    }


    const handleSubmitRecipe = (title, ingredients, isDropdownSelected) => {
        if (formIsValid(title, ingredients, isDropdownSelected)) {
            setShowModal(false)

            if (op === 'add') {
                addRecipe(title, ingredients)
            }

            if(op === 'edit') {
                editRecipe(title, ingredients)
            }
            
            setOp('')
        }
    }
    
    const handleExitModal = () => {
        setShowModal(false)
        setErrors({})
        setOp('')
        setSelectedRecipe(null)
    }

    const getRecipes = () => {
        let dict = {}
        _.each(data, (meals) => {
            _.each(meals, mealDayRecipe => {
                mealDayRecipe.forEach(recipe => {
                    dict[recipe.title] = recipe.ingredients
                })
            })
        })
        return dict
    }

      useEffect( () => {
        if (selectedRecipe && selectedRecipe.title && selectedRecipe.ingredients) {
            const APIKEY = process.env.REACT_APP_NUTRITION_API_KEY
            const APIID = process.env.REACT_APP_NUTRITION_API_ID
            let bodyObj =  {
                'title': selectedRecipe.title,
                'ingr': selectedRecipe.ingredients.split('\n'),
                'mealType': selectedMeal,
            }

            fetch(`https://api.edamam.com/api/nutrition-details?app_id=${APIID}&app_key=${APIKEY}`, {
                'method': 'POST',
                'headers': {
                    'accept': 'text/json',
                    'content-Type': 'application/json'
                },
                'body': JSON.stringify(bodyObj)
            })
            .then(response => {
                return response.json()
            })
            .then(responseData => {
                let newData = {...data}
                let calories = responseData['calories']
                let recipe = newData[selectedDay][selectedMeal].find(r => r.title === selectedRecipe.title) 

                recipe['analysis'] = {calories: calories}
                setData(newData)
                // todo: get the sum all analysis and add 
            
                })
            .catch(err => {
                console.error(err);
            })
        }
      }, [selectedRecipe])


    let recipes = getRecipes()
    return (
        <div className="Planner">
            <Header as="h1">Weekly Meal Planner</Header>
            <Header.Subheader>Add recipes for each meal per day by clicking on the teal buttons.
            Your daily intake summary will appear on the last row.   
            </Header.Subheader>
            <Calendar 
                daysOfWeek={daysOfWeek} 
                meals={meals} 
                data={data} 
                handleSelectMeal={handleSelectMeal}
            />
            { showModal && 
                <RecipeForm 
                    showModal={showModal} 
                    onExit={() => handleExitModal()}
                    day={selectedDay}
                    meal={selectedMeal}
                    onSubmit={handleSubmitRecipe}
                    operation={op}
                    recipe={selectedRecipe}
                    onDelete={handleDeleteRecipe}
                    recipes={recipes}
                    errors={errors}
                /> 
            }
        </div>
    );
}

export default Planner