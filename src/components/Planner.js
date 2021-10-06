import { useState } from "react";
import _ from 'lodash'
import { Header } from 'semantic-ui-react'
// import parseIngredient from 'parse-ingredient'

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
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [op, setOp] = useState('')
    const [errors, setErrors] = useState({})

    const addRecipe = (title, ingredients) => {
        data[selectedDay][selectedMeal].push({title, ingredients})
        setData(data)
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
            setSelectedRecipe(null)
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