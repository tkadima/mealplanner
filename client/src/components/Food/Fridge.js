import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
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
          <MDBBtn floating color='info' >
            <MDBIcon fas icon='plus' />
          </MDBBtn>
        </Link>
      </div>
      <Card.Group itemsPerRow={4}>
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
      </Card.Group>
      <div className='fridge__button--clear'>
        <MDBBtn onClick={handleDeleteAll} disabled={props.foodList.length === 0} color='warning'>Clear Fridge</MDBBtn>
      </div>
    </div>
  )
}

export default Fridge