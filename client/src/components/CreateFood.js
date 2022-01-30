import { Button } from 'semantic-ui-react'
import FoodForm from './FoodForm'

const CreateFood = () => {
    const foodGroupOptions = [
        {key: 0, value: 'dairy', text: 'Dairy'},
        {key: 1, value: 'fruit', text: 'Fruit'},
        {key: 2, value: 'grain', text: 'Grain'},
        {key: 3, value: 'protein', text: 'Protein'},
        {key: 4, value: 'vegetable', text: 'Vegetable'}, 
        {key: 5, value: 'other', text: 'Other'}
    ]
    const unitOptions = [
        {key: 0, value: 'cups', text: 'Cups'},
        {key: 1, value: 'g', text: 'Grams'},
        {key: 2, value: 'tbsp', text: 'Tablespoons'},
        {key: 3, value: 'tsp', text: 'Teaspoons'},
        {key: 4, value: 'oz', text: 'Ounces'},
        {key: 5, value: 'lb', text: 'Pound'}

    ]

    const handleOnSubmit = (food) => {
        console.log(food);
      };

    return (
        <div>
             <h1>
                Add New Food for Fridge
             </h1>
            <FoodForm handleOnSubmit={handleOnSubmit} foodGroupOptions={foodGroupOptions} unitOptions={unitOptions}/>
            <Button color='blue' type='submit' onSubmit={handleOnSubmit}>Submit</Button>
            <Button color='red'>Cancel</Button>
        </div> 
    )
}

export default CreateFood