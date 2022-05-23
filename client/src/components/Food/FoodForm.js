import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FoodInput from './FoodInput.js'

const FoodForm = (props) => {

    const [food, setFood] = useState( props.updatedFood ??
       { name: '', 
        description: '',
        quantity: null, 
        unit: '', 
        foodGroup: null, 
        calories:  null, 
    })

    const handleChange = (property, value) => {
        setFood(prevFood => ({
            ...prevFood, 
            [property]: value
        }))
    }

    return (
        <Form onSubmit={() => props.handleOnSubmit(food)}>
            <Row>
                <FoodInput
                    name='name'
                    label='Name'
                    controlType='input'
                    textType='text'
                    placeholder='Food name'
                    value={props.updatedFood?.name || food.name}
                    onChange={e => handleChange(e.target.name, e.target.value)} // dry this
                />
            </Row>
            <Row>
                <FoodInput
                    name='description'
                    label='Description'
                    controlType='textarea'
                    textType='text'
                    placeholder='Add notes about this ingredient'
                    value={food.description}
                    defaultValue={props.updatedFood?.description}
                    onChange={e => handleChange(e.target.name, e.target.value)}
                />
            </Row>
            <Row>
                <FoodInput 
                    name='quantity'
                    label='Quantity' 
                    controlType='input' 
                    textType='number' 
                    value={props.updatedFood?.quantity || food.quantity}
                    onChange={e => handleChange(e.target.name, e.target.value)}
                />
                <FoodInput name='unit'
                            label='Unit'
                            controlType='select'  
                            value={props.updatedFood?.unit || food.unit}
                            onChange={e => handleChange(e.target.name, e.target.value)}

                />
                <FoodInput name ='foodGroup'
                            label='Food Group' 
                            controlType='select' 
                            value={props.updatedFood?.foodGroup || food.foodGroup} 
                            onChange={e => handleChange(e.target.name, e.target.value)}

                />
                <FoodInput name='calories' 
                            label='Calories' 
                            controlType='input' 
                            textType='number' 
                            value={props.updatedFood?.calories || food.calories}
                            onChange={e => handleChange(e.target.name, e.target.value)}
                /> 
            </Row>
            <Button className='food-form__btn--submit' variant='primary' type='submit'>Submit</Button>
            <Link to='/fridge'>
                <Button variant='warning'>Cancel</Button>
            </Link>
        </Form>
    )
}
export default FoodForm