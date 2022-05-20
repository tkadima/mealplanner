import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Row } from 'react-bootstrap'

import axios from 'axios';

import '../App.scss'
import Food from './Food'

const Fridge = (props) => {
  const handleOnDelete = (id) => {
    let deletedFood = props.foodList.find(item => {
      return item._id === id
    })

    let confirmed = window.confirm(`Are you sure you want to delete ${deletedFood.name} from the fridge?`) 
    if (confirmed) {
      axios.delete(`http://localhost:3001/api/food/${id}`)
      .then(res => {
        props.setFoodList(props.foodList.filter(item => {
          return item._id !== id
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
    <div className='fridge fridge__container container bg-light'>
      <h1 className='fridge__header'>
        Welcome to the Fridge
      </h1>
      <div className='fridge__button--add'>
        <Link to='/fridge/new'>
          <Button variant='info' className='rounded-circle' >
          <i class="fa fa-plus"></i>
          </Button>
        </Link>
      </div>
      <Container className='p-4'>
        <Row>
        {
          props.foodList.map((item, i) => { 
              return <Food 
                key={i} 
                foodId={item._id}
                name={item.name}
                foodGroup={item.foodGroup}
                description={item.description} 
                onDelete={handleOnDelete}
              />
          })
        }
        </Row>
      </Container>
      <div className='fridge__button--clear'>
        <Button onClick={handleDeleteAll} disabled={props.foodList.length === 0} color='warning'>Clear Fridge</Button>
      </div>
    </div>
  )
}

export default Fridge