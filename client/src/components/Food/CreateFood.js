import axios from 'axios'
import * as FormData from 'form-data'
import { useHistory } from "react-router-dom";

import FoodForm from './FoodForm'

const CreateFood = (props) => {
    let history = useHistory(); 

    const handleOnSubmit = (food, foodImage) => {
         let foodFormData = new FormData()
         let imageFormData = new FormData()

        for (let property in food) {
            foodFormData.append(property, food[property])
        }

        imageFormData.append('imageFile', foodImage.file)

        Promise.all([
            axios.post('http://localhost:3001/imageUpload', imageFormData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }),
            axios.post('http://localhost:3001/api/food/new', foodFormData, {
                headers: {
                    'content-type':'application/json'
                }
            }),

        ])
        .then(axios.spread((foodResponse, imageResponse) => {
            console.log('foodresponse', foodResponse)
            console.log('imageResponse', imageResponse)
           // props.setFoodList([...props.foodList, res.data])
        }))
        .then(res => {
            history.push('/fridge')
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