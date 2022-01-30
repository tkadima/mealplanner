import React, { useState } from 'react'
import {  Form, Grid, Image, Input, Select, TextArea } from 'semantic-ui-react'

const FoodForm = (props) => {
    const [image, setImage] = useState(null)
    const [food, setFood] = useState({ name: '', description: '', quantity : 0.0, unit: '', group: '', calories: 0})

    let imageUrl = image ? URL.createObjectURL(image) : '/images/default.png'

    const handleSubmit = (e) => {
        fetch('http://localhost:3001/food/new', {
            method: 'POST',
            body: JSON.stringify(food)
        }).then(res => {
            return res.json()
        })
        e.preventDefault()
    }
    return (
        <Form className='food-form' onSubmit={handleSubmit}>
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
                                    options={props.unitOptions}
                                />
                                 <Form.Field 
                                    label='Food Group' 
                                    control={Select} 
                                    placeholder='Select food group' 
                                    options={props.foodGroupOptions}
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
    );

}
export default FoodForm