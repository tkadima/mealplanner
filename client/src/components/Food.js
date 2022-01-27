import { Card, Button, Image } from 'semantic-ui-react'

const Food = (props) => {
    return (
        <Card className='food'>
            <Card.Content>
                <Image className="food__image"size='small' src={props.imageUrl}  wrapped />
                <Card.Header className='food__header'>{props.name}</Card.Header>
                <Card.Description className='food__description'>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra className='food__actions'>
                <Button basic color='green'>Edit</Button>
                <Button basic color='red'>Delete</Button>
            </Card.Content> 
        </Card>
    )
}
export default Food 