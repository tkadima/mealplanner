import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon } from 'semantic-ui-react'

import './App.scss'
import Food from './Food'

const Fridge = () => {
  const [data, setData] = useState([])

  const getFood = () => {
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
      console.log('printing nothing', foodList)
      setData(foodList)
    })
    .catch(e => {
      console.log(e)
    }) 
  }

  useEffect(() => {
    getFood()
  }, [])

  return(
    <div className='fridge fridge__container container'>
      <h1 className='fridge__header'>
        Welcome to the Fridge
      </h1>
      <div className='fridge__plus-button-container'>
        <Link to='/fridge/new'>
          <Icon 
              className='fridge__plus-button' 
              color='teal' 
              name='plus circle' 
              size='large' 
            />  
        </Link>
      </div>
      <Card.Group itemsPerRow={4}>
      {
        data.map((item, i) => { 
            return <Food 
              key={i} 
              name={item.name} 
              description={item.description} 
              imageUrl={item.imageUrl}
            />
        })
      }
      </Card.Group>
    </div>
  )
}

export default Fridge