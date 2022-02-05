import axios from 'axios'
import * as FormData from 'form-data'
import { useHistory } from "react-router-dom";

import FoodForm from './FoodForm'

const CreateFood = (props) => {
    let history = useHistory(); 

    const handleOnSubmit = (food) => {
         let formData = new FormData()
        for (let property in food) {
            formData.append(property, food[property])
        }
        
        axios.post('http://localhost:3001/api/food/new', formData)
        .then(res => {
            props.setFoodList([...props.foodList, res.data])
        })
        .then(res => {
            history.push('/fridge')
        })
    }

    return (
        <div>
             <h1>
                Add New Food for Fridge
             </h1>
            <FoodForm  op='create'handleOnSubmit={handleOnSubmit} />
        </div> 
    )
}

export default CreateFood