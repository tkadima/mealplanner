import axios from 'axios'

import FoodForm from './FoodForm'

const CreateFood = (props) => {

    const handleOnSubmit = (food) => {
        axios.post('http://localhost:3001/api/food/new', food)
            .then(res => {
                console.log('res', res)
                props.setFoodList([...props.foodList, {res}])
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