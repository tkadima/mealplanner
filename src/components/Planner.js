import { useState, useEffect } from "react";
import _ from 'lodash'
import { Header } from 'semantic-ui-react'
import parseIngredient from 'parse-ingredient'
import {difference} from '../difference'

import Calendar from './Calendar'
import RecipeForm from './RecipeForm'

const Planner = ({foodGroups}) => {
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
    const [ingredientGroups, setIngredientGroups] = useState({
        'Dairy':[], 'Fruit': [], 'Grain': [], 'Protein':[], 'Vegetable': [], 
         'Legumes, Nuts and Seeds':[], 'Other':[]
    })
    const [summary, setSummary] = useState({})

    /* 
        Summary game plan 
       - create dictionary of ingredients and foodGroups -> ingredientsByGroup 
       - ingredientsByGroup = {'vegetable': ['sweet potato], 'protein': [...]}
       - when recipe is added, loop through list of ingredients - for each ingredient:
            - parse ingredient, get description 
            - if ingredient not all ready in dict, fetch group from api 
            - save ingredient to foodGroup key in ingredientsByGroup
        
        - Add 'Total' key to data -> {Sunday: {Breakfast: []... Total: {Fruit: 2, }}...}
        - use ingredientsBy to get a count of each foodGroup per day 
        - On edits, check if ingredients changed, recalculate totals
        - On delete, remove serving from total 
     */

    const createSummary = (day, ingredients) => {
        _.forEach(ingredients, i => {

            // find ingredientGroup that contains i.description
            // increment by 1
            // redo below
            console.log('vegetables', ingredientGroups['Vegetable'])
        })
    } 

    const getIngredientGroups = async (day, ingredients) => {
        let ingredientsAsList = ingredients.split('\n')
        let parsedIngredients = _.flatMap(ingredientsAsList, i => {
            return parseIngredient(i)
        })
        const API_KEY = process.env.REACT_APP_NUTRITION_API_KEY

        let ingredientsInGroups = parsedIngredients.filter(i => {
            return ingredientGroups.hasOwnProperty(i.description)
        })

        createSummary(day, ingredientsInGroups)
        
        let ingredientToFetch = parsedIngredients.filter(i => {
            return !ingredientGroups.hasOwnProperty(i.description)
        })

        ingredientToFetch.map(async (ingredient) => {
           const response = await fetch(`https://nutrition-api.esha.com/foods?query=${ingredient.description}&spell=true&count=1`, {
                method: 'GET',
                headers: {
                    'Host': 'nutrition-api.esha.com',
                    'Accept': 'application/json',
                    'Ocp-Apim-Subscription-Key': API_KEY,
                    'Access-Control-Allow-Origin': '*'
                }
            })
        
           const json = await response.json()
           let groups = `${json.items[0].category} ${json.items[0].groups}`
           let group = _.find(foodGroups, f => {
               return _.some(f.subcategories, sub => {
                   return groups.toLowerCase().includes(sub)
               })
            })
            if (group) {
                ingredientGroups[group.name] = [...ingredientGroups[group.name], ingredient.description]
                setIngredientGroups(ingredientGroups)
               // console.log(group.name, ingredientGroups[group.name])
            }
            else {
                ingredientGroups['Other'].push(ingredient.description)
                setIngredientGroups(ingredientGroups)
               // console.log('Other', ingredientGroups['Other'])

            }
        })
        createSummary(day, ingredientToFetch)
      }

      useEffect(() => {
        
      }, [data])
    


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
               summary={summary}
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