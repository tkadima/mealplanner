import axios from 'axios'
import * as FormData from 'form-data'
import { useHistory } from "react-router-dom";

import FoodForm from './FoodForm'

const CreateFood = (props) => {
    let history = useHistory(); 

    const handleOnSubmit = (food, foodImage) => {
        let formData = new FormData()

        for(let property in food) {
            formData.append(property, food[property])
        }

        formData.append('imageFile', foodImage.file)

        axios.post('http://localhost:3001/api/food/new', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            props.setFoodList([...props.foodList, response.data])
        })
        .then(res => {
            history.push('/fridge')
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