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
import './App.scss'

 const App = () => {

  const [data, setData] = useState([])

  const getAllFood = () => {
    axios.get('http://localhost:3001/api/food')
    .then(response => {
      const foodList = response.data
      setData(foodList)
    })
    // todo why is foodlist empty in the newest EditFood component 
    // but not in other places?

  }

  useEffect(() => {
    getAllFood()
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
              <Fridge foodList={data} setFoodList={setData} />
            </Route>
            <Route exact path="/fridge/new">
              <CreateFood foodList={data} setFoodList={setData}/>
            </Route>
            <Route path="/fridge/update/:id" >
              <EditFood foodList={data} setFoodList={setData} />
            </Route>
            <Route path="/recipes">
              <RecipeBook />
            </Route>
        </Router>
      </div>
    </Layout>
  );
}

export default App;
