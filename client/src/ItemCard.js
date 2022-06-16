import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ItemCard = (props) => {

    const displayImage = () => {
        return '/images/default.png';
    }

    
    return (
        <Card className='food m-2'>
            <Card.Img src={displayImage()}  position='top' />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
                <Link to={props.link}>
                    <Button className='food__button--edit'>Edit</Button>
                </Link>
                <Button variant='danger' className='food__button--delete'onClick={() => props.onDelete(props.itemId)}>Delete</Button>
            </Card.Body>
        </Card>)
}
export default ItemCard