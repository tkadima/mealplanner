import { Button, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';

import '../App.scss'
import ItemCard from '../../ItemCard';

// TODO maybe create common components for recipebook and fridge 
const RecipeBook = (props) => {


    let sampleRecipes = [ 
        {_id: 1, name: 'Gnocchi minestrone soup', description: 'italian classic'}, 
        {_id: 2, name: 'Lentil sloppy joes', description: 'vegan version of american classic'},
        {_id: 3, name: 'Red beans and rice', description: 'instant pot recipe'},
        {_id: 4, name: 'Vegetable teriyaki', description: 'perfect for left overs'},
        {_id: 5, name: 'Butterbean soup', description: 'first figure out what butter beans are'}

    ]

    const handleOnDelete = () => {}

    const handleDeleteAll = () => {
        let confirmed = window.confirm(`Are you sure you want to delete all ${props.recipeList.length} items from the fridge?`) 
        if (confirmed) {
            axios.delete('http://localhost:3001/api/food')
            .then(res => {
              props.setFoodList([])
            })
        }
    }

    return (
        <div className="container">
            <h1>Recipe Book</h1>
            <div className='fridge__button--add'>
                <Link to='/recipes/new'>
                    <Button variant='info' className='rounded-circle' >
                        <i class="fa fa-plus"></i>
                    </Button>
                </Link>
            </div>
            <Container className='p-4'>
                <Row>
                {
                    sampleRecipes.map((recipe, i) => {
                        return <ItemCard 
                            key={i} 
                            itemId={recipe._id}
                            name={recipe.name}
                            description={recipe.description} 
                            onDelete={handleOnDelete}
                            link={'#'}
                        />
                    })
                }

                </Row>

            </Container>
            <div className='fridge__button--clear'>
                <Button onClick={handleDeleteAll} disabled={props.recipeList.length === 0} color='warning'>Clear Fridge</Button>
            </div>
        </div>
    )
}
export default RecipeBook