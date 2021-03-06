import { useParams, useHistory } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import FoodForm from './FoodForm'

const EditFood = (props) => {

    let history = useHistory(); 
    const { id } = useParams()
    const [food, setFood] = useState({})

    const getFoodById = useCallback((foodId) => {
        var foodToUpdate =  props.foodList.find(f => f._id === foodId)

        if (foodToUpdate == null) {
            throw(new Error(`Error: could not find food with id ${id}`)) 
        } 
        setFood(foodToUpdate)
    }, [id, props.foodList])

    useEffect(() => {
        getFoodById(id)
    }, [id, getFoodById])

    const handleOnSubmit = (updatedFood) => {
        let formData = {}

        for ( var property in updatedFood) {
            formData[property] = updatedFood[property]
        }

        formData['id'] = id

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.put('http://localhost:3001/api/food/' + id, formData, config)
        .then(res => {
            var updated = props.foodList.map(food => {
                if(food._id === id) return res.data
                else return food
            })
            props.setFoodList(updated)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return(
        <div>
            <h1>
                Edit Food
            </h1>
            <FoodForm updatedFood={food} handleOnSubmit={handleOnSubmit} handleAfterSubmit={() => history.push('/fridge')}/>
        </div>
    )

}

export default EditFood