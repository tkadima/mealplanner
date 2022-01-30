import React, { useState } from 'react'
import { Button, Form, Grid, Image, Input, Select, TextArea } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'

const FoodForm = (props) => {
    const [image, setImage] = useState(null)

    const { register, handleSubmit } = useForm();

    let imageUrl = image ? URL.createObjectURL(image) : '/images/default.png'

    const handleOnSubmit = (food) => {
        console.log('submit food', food);
        fetch('http://localhost:3001/api/food/new', {
            method: 'POST',
            body: JSON.stringify(food)
        }).then(res => {
            return res.json()
        })
      };

    return (
        <Form className='food-form' onSubmit={handleSubmit(handleOnSubmit)}>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Form.Input 
                            label='Name' 
                            control={Input} 
                            placeholder='Enter name of food' 
                            className='food-form__input--text'
                            {...register('name')}
                            />
                            <Form.Input 
                                label='Description' 
                                control={TextArea} 
                                placeholder='Briefly describe the ingredient' 
                                className='food-form__input--textarea'
                                {...register('description')}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Image className="food-form__image"size='small' src={imageUrl} ui={false} />
                            <Input type='file' 
                                className='food-form__input--file'
                                onChange={(e) => setImage(e.target.files[0])}
                                {...register('imageUrl')}
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
                                    control={Input}
                                    width={2}
                                    type='number'
                                    {...register('quantity')}

                                />
                                 <Form.Input
                                    label='Unit'
                                    placeholder='Choose unit type'
                                    control={Select}
                                    options={props.unitOptions}
                                    {...register('unit')}
                                />
                                 <Form.Input 
                                    label='Food Group' 
                                    control={Select} 
                                    placeholder='Select food group' 
                                    options={props.foodGroupOptions}
                                    {...register('foodGroup')}
                                />
                                <Form.Input 
                                    label='Calories' 
                                    control={Input} 
                                    type='number' 
                                    {...register('calories')}
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
                <Button color='red'>Cancel</Button>
            </Form>
    );

}
export default FoodForm