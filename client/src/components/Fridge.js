import React, { useState, useEffect } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import _ from 'lodash'

import Food from './Food'

const Fridge = () => {
  const [data, setData] = useState([])
  const [creating, setCreating] = useState(false)


  const getFood = () => {
    fetch('food.json', {
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
  }

  useEffect(() => {
    getFood()
  }, [])

  const handleAddItem = () => {
    setCreating(true)
  }

  const handleSaveChanges = (name, description, isNew) => {
    if (isNew) {
      let newItems = data.concat({name, description})
      setData(newItems)
      setCreating(false)
    }
    else {
      let index = _.findIndex(data, (item) => {
        return item.name === name
      })
      _.set(data, `items[${index}].description`, description)
      setData(data)
    }
  }

  return(
    <div className="container">
      <h1 className="header">
        Welcome to the Fridge
      </h1>
      <Card.Group itemsPerRow={3}>
      {
        data.map((item, i) => {
          return 
            <Food 
              key={i} 
              name={item.name} 
              description={item.description} 
              isNew={false}
              onSaveChanges={handleSaveChanges}/>
            
        })
      }
      </Card.Group>
      <Icon color="teal" name="plus circle" size='large' onClick={() => handleAddItem()}></Icon>
      {
        creating && 
        <Food name='' description='' onSaveChanges={handleSaveChanges} isNew={true}/> 
      }
    </div>
  )
}

export default Fridge