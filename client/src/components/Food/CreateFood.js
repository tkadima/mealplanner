import axios from 'axios'
import { useHistory } from "react-router-dom";

import FoodForm from './FoodForm'

const CreateFood = (props) => {
    let history = useHistory(); 

    const handleOnSubmit = (food) => {
        let formData = {}

        for(let property in food) {
            formData[property] = food[property]
        }

        axios.post('http://localhost:3001/api/food/', formData, {
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => {
            console.log('response data', response.data)
            props.setFoodList([...props.foodList, response.data])
            history.goBack()
        })
        .catch(error => {
            console.log(error)
        }) 
    }

    return (
        <div>
             <h1>
                Add New Food for Fridge
             </h1>
            <FoodForm  op='create' handleOnSubmit={handleOnSubmit} />
        </div> 
    )
}

export default CreateFood