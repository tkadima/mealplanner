import { Card, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Food = (props) => {
    const displayImage = () => {
        if (props.imageUrl != null) {
            return props.imageUrl
        }
        else {
            return '/images/default.png';
        }
    }
    return (
        <Card className='food'>
            <Card.Content>
                <Image className="food__image"size='small' src={displayImage()}  wrapped />
                <Card.Header className='food__header'>{props.name}</Card.Header>
                <Card.Description className='food__description'>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra className='food__actions'>
                <Link to={`/fridge/update/${props.foodId}`}>
                    <Button basic color='green'>Edit</Button>
                </Link>
                <Button basic color='red' onClick={() => props.onDelete(props.foodId)}>Delete</Button>
            </Card.Content> 
        </Card>
    )
}
export default Food 