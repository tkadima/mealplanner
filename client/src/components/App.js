import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'

import Planner from './Planner'
import Home from './Home'
import Layout from './Layout'
import Fridge from './Food/Fridge';
import CreateFood from './Food/CreateFood'
import EditFood from './Food/EditFood'
import './App.scss'

 const App = () => {

  const [data, setData] = useState([])

  const getAllFood = () => {
    fetch('http://localhost:3001/api/food', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((foodList) => {
      setData(foodList)
    })
    .catch(e => {
      console.log(e)
    }) 
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
            <Route path="/fridge/:id" >
              <EditFood foodList={data} setFoodList={setData} />
            </Route>
        </Router>
      </div>
    </Layout>
  );
}

export default App;
