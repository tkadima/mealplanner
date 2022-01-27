import React, { useState } from 'react'
import { Button, Form, Grid, Image, Input, Select, TextArea } from 'semantic-ui-react'


const FoodForm = () => {
    const foodGroupOptions = [
        {key: 0, value: 'dairy', text: 'Dairy'},
        {key: 1, value: 'fruit', text: 'Fruit'},
        {key: 2, value: 'grain', text: 'Grain'},
        {key: 3, value: 'protein', text: 'Protein'},
        {key: 4, value: 'vegetable', text: 'Vegetable'}, 
        {key: 5, value: 'other', text: 'Other'}
    ]
    const unitOptions = [
        {key: 0, value: 'sm', text: 'Small'},
        {key: 1, value: 'md', text: 'Medium'},
        {key: 2, value: 'lg', text: 'Large'},
        {key: 3, value: 'cups', text: 'Cups'},
        {key: 4, value: 'g', text: 'Grams'},
        {key: 5, value: 'tbsp', text: 'Tablespoons'},
        {key: 6, value: 'tsp', text: 'Teaspoons'},
        {key: 7, value: 'oz', text: 'Ounces'},
        {key: 8, value: 'lb', text: 'Pound'}

    ]
    const [image, setImage] = useState(null)

    let imageUrl = image ? URL.createObjectURL(image) : 'https://react.semantic-ui.com/images/wireframe/image.png'

    return (
        <div>
             <h1>
                Add New Food for Fridge
             </h1>
            <Form className='food-form'>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Form.Field 
                            label='Name' 
                            control={Input} 
                            placeholder='Enter name of food' 
                            className='food-form__input--text'
                            />
                            <Form.Field 
                                label='Description' 
                                control={TextArea} 
                                placeholder='Briefly describe the ingredient' 
                                className='food-form__input--textarea'
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Image className="food-form__image"size='small' src={imageUrl} ui={false} />
                            <Input type='file' 
                                className='food-form__input--file'
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Grid columns={1}>
                <Grid.Row>
                        <Grid.Column>
                            <Form.Group>
                                <Form.Field
                                    label='Quantity'
                                    control={Input}
                                    width={2}
                                    type='number'
                                />
                                 <Form.Field
                                    label='Unit'
                                    placeholder='Choose unit type'
                                    control={Select}
                                    options={unitOptions}
                                />
                                 <Form.Field 
                                    label='Food Group' 
                                    control={Select} 
                                    placeholder='Select food group' 
                                    options={foodGroupOptions}
                                />
                                <Form.Field label='Calories' control={Input} type='number'/>
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
                  
            </Form>
            <Button color='blue'>Submit</Button>
            <Button color='red'>Cancel</Button>
        </div> 
    )
}

export default FoodForm