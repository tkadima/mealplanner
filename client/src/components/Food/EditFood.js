import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'

import FoodForm from './FoodForm'

const EditFood = (props) => {

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
                console.log('changed property', property)
                console.log('changed value', updateFood[property])
                formData.append(property, updateFood[property]);
                foods[index][property] = updateFood[property]
            }
            else {
                console.log('property', property)
                console.log('value', foods[index][property])
                formData.append(property, foods[index][property]);
            }
        }
        console.log('formdata', formData)

        fetch(`http://localhost:3001/api/food/`, {
            method: 'PUT',
            body: formData
        }).then(res => {
            console.log(res)
            props.setFoodList(foods)
        }).catch(err => {
            console.log(err)
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