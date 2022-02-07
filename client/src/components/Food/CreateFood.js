import axios from 'axios'
import * as FormData from 'form-data'
import { useHistory } from "react-router-dom";

import FoodForm from './FoodForm'

const CreateFood = (props) => {
    let history = useHistory(); 

    const handleOnSubmit = (food, foodImage) => {
        console.log('this is what the file looks like', foodImage.file)
        let imageFormData = new FormData()
        imageFormData.append('imageFile', foodImage.file)

        Promise.all([
            axios.post('http://localhost:3001/imageUpload', imageFormData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }),
            axios.post('http://localhost:3001/api/food/new', food, {
                headers: {
                    'content-type':'application/json'
                }
            })
        ])
        .then(axios.spread((imageResponse, foodResponse) => {
            console.log('image response', imageResponse.data)
            props.setFoodList([...props.foodList, foodResponse.data])
        }))
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