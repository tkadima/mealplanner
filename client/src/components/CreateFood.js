import { Form, Input, Segment, Select, TextArea } from 'semantic-ui-react'

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
    return (
        <Segment inverted>
            <Form className='food-form' inverted>
                <h1 className='food-form__title'>
                    Add New Food for Fridge
                </h1>
                <Form.Field 
                    label='Name' 
                    control={Input} 
                    placeholder='Enter name of food' 
                    width={6}
                />
                <Form.Field 
                    label='Description' 
                    control={TextArea} 
                    placeholder='Briefly describe the ingredient' 
                    width={6}
                />
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
                        width={4}
                        options={unitOptions}
                    />
                </Form.Group>
                <Form.Field 
                    label='Food Group' 
                    control={Select} 
                    placeholder='Select food group' 
                    options={foodGroupOptions}
                    width={6}
                />
                <Form.Field label='Calories' control={Input} width={3} type='number'/>

                <Form.Group>
                    <Form.Field label='Cholesterol' control={Input} width={3}/>
                    <Form.Field label='Sodium' control={Input} width={3}/>
                </Form.Group>
                <Form.Group>
                    <Form.Field label='Sugar' control={Input} width={3}/>
                    <Form.Field label='Fiber' control={Input} width={3}/>
                </Form.Group>
                <Form.Group>
                    <Form.Field label='Protein' control={Input} width={3}/>
                    <Form.Field label='Iron' control={Input} width={3}/>
                </Form.Group>
            </Form>
        </Segment>
    )
}

export default FoodForm