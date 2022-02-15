import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Icon } from 'semantic-ui-react'
import axios from 'axios';

import '../App.scss'
import Food from './Food'


const Fridge = (props) => {
  const handleOnDelete = (id) => {
    let deletedFood = props.foodList.find(item => {
      return item.id === id
    })

    let confirmed = window.confirm(`Are you sure you want to delete ${deletedFood.name} from the fridge?`) 
    if (confirmed) {
      axios.delete(`http://localhost:3001/api/food/${id}`)
      .then(res => {
        props.setFoodList(props.foodList.filter(item => {
          return item.id !== id
        }))
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  const handleDeleteAll = () => {
    let confirmed = window.confirm(`Are you sure you want to delete all ${props.foodList.length} items from the fridge?`) 
    if (confirmed) {
      axios.delete('http://localhost:3001/api/food')
      .then(res => {
        props.setFoodList([])
      })
    }
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
              foodGroup={item.foodGroup}
              description={item.description} 
              imageFileName={item.imageFileName}
              onDelete={handleOnDelete}
            />
        })
      }
      </Card.Group>
      <div>
        <Button onClick={handleDeleteAll} disabled={props.foodList.length === 0}>Clear Fridge</Button>
      </div>
    </div>
  )
}

export default Fridge