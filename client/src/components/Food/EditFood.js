import { useParams, useHistory } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import FoodForm from './FoodForm'

const EditFood = (props) => {

    let history = useHistory(); 
    const { id } = useParams()
    const [food, setFood] = useState()

    const getFoodById = useCallback((foodId) => {
        var foodToUpdate =  props.foodList.find(f => f._id === foodId)
        if (foodToUpdate == null) {
            throw(`Error: could not find food with id ${id}`)
        } 
        setFood(foodToUpdate)
    }, [props.foodList])

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
            let emptyValues = ['0', 'null']
            for (var property in food) {
                if (res.data[property] && !emptyValues.includes(res.data[property])) {
                    food[property] = res.data[property]
                }
            }
            // todo: why do I have to refresh to see changes in fridge? 
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