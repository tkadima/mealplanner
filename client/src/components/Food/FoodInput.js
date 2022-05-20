  import { Col, Form } from 'react-bootstrap'

  const FoodInput = (props) => {
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
    let selectOptions
    if (props.controlType === 'select') {
        selectOptions = props.label === 'Unit' ? unitOptions : foodGroupOptions 
    }


    return (
        <Form.Group as={Col} className='food-input'>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control 
                name={props.name}
                type={props.textType} 
                as={props.controlType}
                onChange={props.onChange}  
                placeholder={props.placeholder}
                value={props.value}>
                    {
                        selectOptions && 
                        <>
                            <option>Select a {props.label}</option>
                            {
                                selectOptions.map(option => {
                                    return <option key={option.key} value={option.value}>{option.text}</option>
                                })
                            }
                        </>
                        
                    }
            </Form.Control>
        </Form.Group>
    )
}
export default FoodInput