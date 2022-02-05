import React, { useState } from 'react'
import { Button, Form, Grid, Image, Input, Select, TextArea } from 'semantic-ui-react'
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
    const [foodImage, setFoodImage] = useState('/images/default.png')

    const [food, setFood] = useState( {
        name: '', 
        description: '',
        imageUrl: null,
        image: null, 
        imageName: null, 
        quantity: 0, 
        unit: null, 
        foodGroup: null, 
        calories: null
    })

    const onSelectChange = (e, data) => {
        let property = data.name
        setFood(food => ({
            ...food,
            [property]: data.value 
        }))
    }

    const handleChange = (property, value) => {
            setFood(food => ({
                ...food, 
                [property]: value
            }))
    }

    return (
        <Form className='food-form' onSubmit={() => props.handleOnSubmit(food)} encType='multipart/form'>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Form.Input 
                                label='Name'
                                name='name'
                                defaultValue={props.updatedFood?.name } 
                                control={Input} 
                                placeholder='Enter name of food' 
                                className='food-form__input--text'
                                onChange={e => handleChange('name', e.target.value)}
                            />
                            <Form.Input 
                                label='Description' 
                                name='description'
                                defaultValue={props.updatedFood?.description} 
                                control={TextArea} 
                                placeholder='Briefly describe the ingredient' 
                                className='food-form__input--textarea'
                                onChange={e => handleChange('description', e.target.value)}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Image className="food-form__image"size='small' src={foodImage} ui={false} />
                            <Input type='file' 
                                id='file'
                                name='imageUrl'
                                enctype='multipart/form-data'
                                className='food-form__input--file'
                                onChange={e => handleChange('imageUrl', e.target.files[0])}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Grid columns={1}>
                <Grid.Row>
                        <Grid.Column>
                            <Form.Group>
                                <Form.Input
                                    label='Quantity'
                                    name='quantity'
                                    control={Input}
                                    width={2}
                                    type='number'
                                    onChange={e => handleChange('quantity', e.target.value)}
                                    defaultValue={props.updatedFood?.quantity} 
                                />
                                 <Form.Input
                                    label='Unit'
                                    name='unit'
                                    placeholder={props.op === 'update' ? 'Choose unit type' : props.updatedFood?.unit}
                                    control={Select}
                                    options={unitOptions}
                                    onChange={onSelectChange}
                                    defaultValue={
                                        props.updatedFood ? 
                                        {
                                            label: unitOptions.filter(u => u.value === props.updatedFood.unit),
                                            value: props.updatedFood?.unit
                                        }
                                        : null } 
                                />
                                 <Form.Input 
                                    label='Food Group' 
                                    name='foodGroup'
                                    control={Select} 
                                    placeholder='Select food group' 
                                    options={foodGroupOptions}
                                    onChange={onSelectChange}
                                    defaultValue={props.updatedFood?.foodGroup}  
                                />
                                <Form.Input 
                                    label='Calories' 
                                    name='calories'
                                    control={Input} 
                                    type='number' 
                                    onChange={e => handleChange('calories', e.target.value)}
                                    defaultValue={props.updatedFood?.calories} 
                                />
                            </Form.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Group>
                                <Form.Field label='Total Fat (g)' control={Input} type='number' />
                                <Form.Field label='Saturated Fat (g)' control={Input} type='number'/>
                                <Form.Field label='Trans Fat (g)' control={Input} type='number' />
                            </Form.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Form.Group>
                                <Form.Field label='Cholesterol (mg)' control={Input}  type='number'/>
                                <Form.Field label='Sodium (mg)' control={Input}  type='number'/>
                            </Form.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Group>
                                <Form.Field label='Total Carbohydrate (g)' control={Input}  type='number'/>
                                <Form.Field label='Sugar (g)' control={Input}  type='number'/>
                                <Form.Field label='Fiber (g)' control={Input}  type='number'/>
                                <Form.Field label='Added sugars (g)' control={Input}  type='number'/>
                            </Form.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Group>
                                <Form.Field label='Protein (g)' control={Input} type='number'/>
                                <Form.Field label='Iron (mg)' control={Input}  type='number'/>
                                <Form.Field label='Magnesium (mg)' control={Input}  type='number'/>
                                <Form.Field label='Biotin (mcg)' control={Input}  type='number'/>
                                <Form.Field label='Potassium (mg)' control={Input} type='number'/>
                            </Form.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Button color='blue' type='submit'>Submit</Button>
                <Link to='/fridge'>
                    <Button color='red'>Cancel</Button>
                </Link>
            </Form>
    );

}
export default FoodForm