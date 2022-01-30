import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon } from 'semantic-ui-react'

import './App.scss'
import Food from './Food'

const Fridge = (props) => {

  const handleOnDelete = (id) => {
    fetch(`http://localhost:3001/api/food/${id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'DELETE',
    }).then(res => {
      console.log(res)
      props.setFoodList(props.foodList.filter(item => {
        return item.id !== id
      }))
    })
  }

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
        props.foodList.map((item, i) => { 
            return <Food 
              key={i} 
              foodId={item.id}
              name={item.name} 
              description={item.description} 
              imageUrl={item.imageUrl}
              onDelete={handleOnDelete}
            />
        })
      }
      </Card.Group>
    </div>
  )
}

export default Fridge