import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'
import _ from 'lodash'

import Food from './Food'
import * as data from './food.json'

const Fridge = () => {
  const [items, setItems] = useState([])
  const [creating, setCreating] = useState(false)

  const handleAddItem = () => {
    setCreating(true)
  }
  const handleSaveChanges = (name, description, isNew) => {
    if (isNew) {
      console.log('adding', {name, description})
      let newItems = items.concat({name, description})
      setItems(newItems)
      setCreating(false)
    }
    else {
      let index = _.findIndex(items, (item) => {
        return item.name === name
      })
      _.set(items, `items[${index}].description`, description)
      setItems(items)
    }
  }

  return(
    <div className="container">
      <h1 className="header">
        Welcome to the Fridge
      </h1>
      <p>{JSON.stringify(data)}</p>
      {
        items.map((item, i) => {
          return <Food 
                    key={i} 
                    name={item.name} 
                    description={item.description} 
                    isNew={false}
                    onSaveChanges={handleSaveChanges}/>
        })
      }
      <Icon color="teal" name="plus circle" size='large' onClick={() => handleAddItem()}></Icon>
      {
        creating && 
        <Food name='' description='' onSaveChanges={handleSaveChanges} isNew={true}/> 
      }
    </div>
  )
}

export default Fridge