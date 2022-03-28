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

    const onSelectChange = (e, data) => {
        let property = data.name
        setFood(food => ({
            ...food,
            [property]: data.value 
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
    return (
        <Form className='food-form' onSubmit={() => props.handleOnSubmit(food, foodImage)} encType='multipart/form'>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Form.Input 
                                label='Name'
                                defaultValue={props.updatedFood?.name} 
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
                            <Image className='food-image_preview'
                                size='small' 
                                src={displayImage()}
                                ui={false} 
                                alt='Upload image'
                                defaultValue=''
                            />

                            <Input 
                                className='food-image__input'
                                name='imageFile'
                                type='file' 
                                id='file'
                                onChange={e => handleChange('imageFile', e.target.files[0])}
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
                                 <Form.Dropdown
                                    label='Unit'
                                    name='unit'
                                    placeholder={props.op === 'update' ? 'Choose unit type' : props.updatedFood?.unit}
                                    control={Select}
                                    options={unitOptions}
                                    onChange={onSelectChange}
                                />
                                 <Form.Dropdown 
                                    label='Food Group' 
                                    name='foodGroup'
                                    control={Select} 
                                    placeholder='Select food group' 
                                    options={foodGroupOptions}
                                    onChange={onSelectChange}
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
                <Button className='food-form__btn--submit' color='blue' type='submit'>Submit</Button>
                <Link to='/fridge'>
                    <Button color='red'>Cancel</Button>
                </Link>
            </Form>
    );

}
export default FoodForm