import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Divider } from 'semantic-ui-react'
import { useState } from 'react'; 
import _ from 'lodash'

const RecipeForm = (props) => {
    const [title, setTitle] = useState(props.recipe ? props.recipe.title : '')
    const [ingredients, setIngredients] = useState( props.recipe ? props.recipe.ingredients : '')
    const [dropdownSelected, setDropdownSelected] = useState(false)

    const handleChange = (e) => {
        if (e.currentTarget.name === 'title') {
            setTitle(e.target.value)
        }
        else if(e.currentTarget.name === 'recipe-select'){
            setTitle(e.target.value)
            setIngredients(props.recipes[e.target.value])
            setDropdownSelected(true)
        }
        else {
            setIngredients(e.target.value)
        }
    }

    const dropDown = _.map(props.recipes, (ingredients, title) => {
           return <option key={ingredients}>{title}</option>
    })
    
    return (
        <Modal show={props.showModal} onHide={props.onExit}> 
            <Modal.Header closeButton>
                <Modal.Title>{_.capitalize(props.operation)} recipe for {props.meal} on {props.day}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group>
                    <Form.Label>Select A Recipe</Form.Label>
                     <Form.Control as="select" 
                                  name="recipe-select"
                                  disabled={props.recipes.length === 0 }
                                  onChange={e => handleChange(e)}>
                        <option></option>
                         {dropDown} 
                    </Form.Control> 
                </Form.Group>
                 <Divider section />
                <Form.Group >
                    <Form.Label> Create A Recipe</Form.Label>
                    <Form.Control type="text" 
                                  onChange={e => handleChange(e)} 
                                  name="title" 
                                  placeholder="Recipe Title"
                                  value={title}
                                  disabled={props.operation === 'edit' || dropdownSelected}
                                  isInvalid={Boolean(props.errors.title)}
                                  /> 
                    <Form.Control.Feedback type="invalid">{props.errors.title}</Form.Control.Feedback>
                </Form.Group>
              
                <Form.Group>
                    <Form.Control as="textarea" 
                                  rows={3} 
                                  name="ingredients" 
                                  onChange={e => handleChange(e)} 
                                  placeholder="Enter ingredients portion of recipe"
                                  value={ingredients} 
                                  disabled={dropdownSelected}
                                  isInvalid={Boolean(props.errors.ingredients)}/>
                    <Form.Control.Feedback type="invalid">{props.errors.ingredients}</Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <button type="submit" 
                        className="btn btn-primary"
                        onClick={() => props.onSubmit(title, ingredients, dropdownSelected)}>
                        Save changes
                </button>
                { props.operation === 'edit' && 
                    <button type="button" className="btn btn-danger" onClick={() => props.onDelete(title)}>
                    Delete
                </button>}
            </Modal.Footer>
        </Modal>
    )
}
export default RecipeForm