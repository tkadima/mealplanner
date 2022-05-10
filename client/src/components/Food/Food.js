import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Food = (props) => {
    const displayImage = () => {
        if (props.imageFileName != null) {
            return 'http://localhost:3001/' + props.imageFileName
        }
        else {
            return '/images/default.png';
        }
    }

    return (
        <Card className='food m-2'>
            <Card.Img src={displayImage()}  position='top' />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
                <Link to={`/fridge/update/${props.foodId}`}>
                    <Button className='food__button--edit'>Edit</Button>
                </Link>
                <Button variant='danger' className='food__button--delete'onClick={() => props.onDelete(props.foodId)}>Delete</Button>
            </Card.Body>
        </Card>
    )
}
export default Food 