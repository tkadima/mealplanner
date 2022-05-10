import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FoodForm = (props) => {

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

    const [food, setFood] = useState( props.op === 'update' ? props.updatedFood :
       { name: '', 
        description: '',
        quantity: 0, 
        unit: '', 
        foodGroup: null, 
        calories:  null, 
        imageFileName: null
    })

    const [foodImage, setFoodImage] = useState({
        file: [],
        imagePreview: null
    })

    const onSelectChange = (data) => {
        console.log('data', data.target.name, data.target.value)
        let property = data.target.name
        setFood(food => ({
            ...food,
            [property]: data.target.value 
        }))
    }

    const handleChange = (property, value) => {
        if (property === 'imageFile') {
            setFoodImage(foodImage => ({
                ...foodImage,
                file: value,
                imagePreview: URL.createObjectURL(value)
            }))
        }
        else {
            setFood(food => ({
                ...food, 
                [property]: value
            }))
        }
    }

    const displayImage = () => {
        if (foodImage?.imagePreview) {
            return foodImage.imagePreview
        }
        else if (props.updatedFood?.imageFileName) {
            return 'http://localhost:3001/' + props.updatedFood.imageFileName
        }
        else {
            return '/images/default.png'
        }
    }

    const FoodInput = (props) => {
        let selectOptions
        if (props.controlType === 'select') {
            selectOptions = props.label === 'Unit' ? unitOptions : foodGroupOptions 
        }

        return (
            <Form.Group className='mb-3'>
                <Form.Label className='food-label'>{props.label}</Form.Label>
                <Form.Control 
                    name={props.name}
                    type={props.textType} 
                    as={props.controlType}
                    onChange={props.onValueChange}  
                    placeholder={props.placeholder}>
                        {
                            selectOptions && 
                            <>
                                <option>Select a {props.label}</option>
                                {
                                    selectOptions.map(option => {
                                        return <option value={option.value} key={option.key}>{option.text}</option>
                                    })
                                }
                            </>
                          
                        }
                </Form.Control>
            </Form.Group>
        )
    }

    return (
        <Form>
            <Form.Group className='food-input'>
                <FoodInput
                    name='name'
                    label='Name'
                    controlType='input'
                    placeholder='Food name'
                    onValueChange={e => handleChange('name', e.target.value)}
                />
                 <FoodInput
                    name='description'
                    label='Description'
                    controlType='textarea'
                    placeholder='Add notes about this ingredient'
                    onValueChange={e => handleChange('description', e.target.value)}
                />
                <FoodInput 
                    name='quantity'
                    label='Quantity' 
                    controlType='input' 
                    textType='number' 
                    onValueChange={e => handleChange('quantity', e.target.value)}
                />
                <FoodInput name='unit'
                           label='Unit'
                           controlType='select'  
                           onValueChange={e => onSelectChange(e)}
                />
                <FoodInput name ='foodGroup'
                           label='Food Group' 
                           controlType='select' 
                           name='foodGroup'
                           onValueChange={e => onSelectChange(e)}
                           value={props.updatedFood?.foodGroup || food.foodGroup} 
                />
                <FoodInput name='calories' 
                           label='Calories' 
                           controlType='input' 
                           textType='number' 
                           onValueChange={e => handleChange('calories', e.target.value)}
                /> 
            </Form.Group>
            <Button className='food-form__btn--submit' color='blue' type='submit'>Submit</Button>
            <Link to='/fridge'>
                <Button color='red'>Cancel</Button>
            </Link>
        </Form>
    );

}
export default FoodForm