import { Card, Icon, Image, Input } from 'semantic-ui-react'
import { useState } from 'react'; 

const Food = () => {
    const [name, setName] = useState('Sample Food Name')
    const [description, setDescription] = useState('Rich in Vitamin C')
    const [isEditting, setIsEditting] = useState(false)
    const [image, setImage] = useState(null)

    const handleEditting = (e) => {
        if (e.currentTarget.name === 'name') {
            setName(e.target.value)
        }
        if (e.currentTarget.name === 'description') {
            setDescription(e.target.value)
        }
    }

    let imageUrl = image ? URL.createObjectURL(image) : 'https://react.semantic-ui.com/images/wireframe/image.png'
    return (
        <div>
            <Card>
                <Image src={imageUrl} ui={false} />
                <Input type='file' hidden={!isEditting} onChange={(e) => setImage(e.target.files[0])}/>
            <Card.Content>
                {
                    isEditting ? <Input name='name' value={name} onChange={e => handleEditting(e)}/> 
                    : 
                    <Card.Header className='food-card-header'>{name}</Card.Header>
                }
                <Card.Description>
                    {
                        isEditting ? 
                        <Input name='description' value={description} onChange={e => handleEditting(e)}/>
                        : 
                        <Card.Header className= 'food-card-description'>{description}</Card.Header>
                    }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='pencil' onClick={() => setIsEditting(!isEditting)}></Icon>
                {isEditting ? <Icon name='save' onClick={() => setIsEditting(false)}></Icon> : <Icon name="trash"></Icon>}
            </Card.Content>
            </Card>
        </div>
    )
}
export default Food