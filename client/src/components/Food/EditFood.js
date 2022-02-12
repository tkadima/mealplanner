import { useParams, useHistory } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import FoodForm from './FoodForm'

const EditFood = (props) => {

    let history = useHistory(); 
    const { id } = useParams()
    const [food, setFood] = useState()

    const getFoodById = useCallback((foodId) => {
        var foodToUpdate =  props.foodList.find(f => f.id === parseInt(foodId))
        setFood(foodToUpdate)
    })

    useEffect(() => {
        getFoodById(id)
    }, [id, getFoodById])

    const handleOnSubmit = (updatedFood, updatedImage) => {
        let formData = new FormData()
        console.log('updated', updatedFood)
        for ( var property in updatedFood) {
            formData.append(property, updatedFood[property]);
        }

        formData.append('imageFile', updatedImage.file)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.put('http://localhost:3001/api/food/', formData, config)
        .then(res => {

            let emptyValues = ['0', 'null']
            for (var property in food) {
                console.log('value to parse', res.data[property])
                if (res.data[property] && !emptyValues.includes(res.data[property])) {
                    food[property] = res.data[property]
                }
            }
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