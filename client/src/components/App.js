import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
//import 'semantic-ui-css/semantic.min.css' todo: decide if using 

import Planner from './Planner'
import Home from './Home'
import Layout from './Layout'
import Fridge from './Food/Fridge';
import CreateFood from './Food/CreateFood'
import EditFood from './Food/EditFood'
import RecipeBook from './Recipes/RecipeBook'
import CreateRecipe from './Recipes/CreateRecipe';
import EditRecipe from './Recipes/EditRecipe';

import './App.scss'

 const App = () => {

  const [food, setFood] = useState([])
  const [recipes, setRecipes] = useState([])

  // TODO: reduce the amount of fetches to the database - redux 
  const getAllFood = () => {
    axios.get('http://localhost:3001/api/food')
    .then(response => {
      const foodList = response.data
      setFood(foodList)
    })
  }

  const getAllRecipes = () => {
    axios.get('https://localhost:3001/api/recipes')
    .then(response => {
      const recipeList = response.data 
      setRecipes(recipeList)
    })
  }

  useEffect(() => {
    getAllFood()
    getAllRecipes()
  }, [])

  return (
    <Layout>
      <div className="App">
        <Router>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/planner">
              <Planner /> 
            </Route>
            <Route exact path="/fridge">
              <Fridge foodList={food} setFoodList={setFood} />
            </Route>
            <Route exact path="/fridge/new">
              <CreateFood foodList={food} setFoodList={setFood}/>
            </Route>
            <Route path="/fridge/update/:id" >
              <EditFood foodList={food} setFoodList={setFood} />
            </Route>
            <Route exact path="/recipes">
              <RecipeBook recipeList={recipes} setRecipeList={setRecipes}/>
            </Route>
            <Route path="/recipes/new">
              <CreateRecipe recipeList={recipes} setRecipeList={setRecipes}/>
            </Route>
            <Route path="/recipes/update/:id">
              <EditRecipe recipeList={recipes} setRecipeList={setRecipes}/>
            </Route>
        </Router>
      </div>
    </Layout>
  );
}

export default App;
