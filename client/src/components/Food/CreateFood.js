import FoodForm from './FoodForm'

const CreateFood = (props) => {

    const handleOnSubmit = (food) => {
        fetch('http://localhost:3001/api/food/new', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(food)
        }).then(res => {
           props.setFoodList([...props.foodList,{res}])
        })
      };

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