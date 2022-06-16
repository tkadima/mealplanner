import { Button, Container, Row } from 'react-bootstrap'

import ItemCard from '../../ItemCard';

const RecipeBook = () => {


    let sampleRecipes = [ 
        {_id: 1, name: 'Gnocchi minestrone soup', description: 'italian classic'}, 
        {_id: 2, name: 'Lentil sloppy joes', description: 'vegan version of american classic'},
        {_id: 3, name: 'Red beans and rice', description: 'instant pot recipe'},
        {_id: 4, name: 'Vegetable teriyaki', description: 'perfect for left overs'},
        {_id: 5, name: 'Butterbean soup', description: 'first figure out what butter beans are'}

    ]

    const handleOnDelete = () => {}

    return (
        <div className="container">
            <h1>Recipe Book</h1>
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
          
        
        </div>
    )
}
export default RecipeBook