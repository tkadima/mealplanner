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
        console.log('updated', updateFood)
        let index = props.foodList.findIndex(f => f.id === parseInt(id))
        var foods = props.foodList
        for(const property in updateFood) {
            foods[index][property] = updateFood[property]
        }

        fetch(`http://localhost:3001/api/food/`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify(foods[index])
        }).then(res => {
            props.setFoodList(foods)
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