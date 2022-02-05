import { useParams, useHistory } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import FoodForm from './FoodForm'

const EditFood = (props) => {

    let history = useHistory(); 
    const { id } = useParams()
    const [food, setFood] = useState(null)

    const getFoodById = useCallback((foodId) => {
        var foodToUpdate =  props.foodList.find(f => f.id === parseInt(foodId))
        setFood(foodToUpdate)
    })

    useEffect(() => {
        getFoodById(id)
    }, [id, getFoodById])

    const handleOnSubmit = (updateFood) => {
        let index = props.foodList.findIndex(f => f.id === parseInt(id))
        var foods = props.foodList
        let formData = new FormData()

        for ( var property in foods[index] ) {
            if (updateFood[property]) {
                formData.append(property, updateFood[property]);
                foods[index][property] = updateFood[property]
            }
            else {
                formData.append(property, foods[index][property]);
            }
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.put('http://localhost:3001/api/food/', formData, config)
        .then(res => {
            console.log(res)
            props.setFoodList(foods)
        })
        .then(res => {
            history.push('/fridge')
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
            <FoodForm op='update' updatedFood={food} handleOnSubmit={handleOnSubmit}/>
        </div>
    )

}

export default EditFood