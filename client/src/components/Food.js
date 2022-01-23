import { Card, Button, Image, Input } from 'semantic-ui-react'
import { useState } from 'react'; 


const Food = (props) => {
    const [name, setName] = useState(props.name)
    const [description, setDescription] = useState(props.description)
    const [isEdit, setIsEdit] = useState(props.isNew)
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
            <Card className='food'>
                <Image className="food__image"size='small' src={imageUrl}  wrapped ui={false} />
                <Input type='file' 
                    className='food__image--upload' 
                    hidden={!isEdit && !props.isNew} 
                    onChange={(e) => setImage(e.target.files[0])}
                />
            <Card.Content>
                {
                    isEdit && props.isNew ? 
                    <Input name='name' value={name} onChange={e => handleEditting(e)}/> 
                    :
                    <Card.Header className='food__header'>{name}</Card.Header>
                }
            </Card.Content>
            <Card.Content extra>
            <div className='food__actions'>
                {
                    isEdit ? 
                    <div className='food__actions--submit'>
                        <Button basic color='blue' name='save' onClick={() => 
                        {
                            setIsEdit(false)
                            props.onSaveChanges(name, description, props.isNew)
                        }}>
                            Submit 
                        </Button> 
                    </div>
                    : 
                    <div className='food__actions--update'>
                        <Button basic color='green' onClick={() => setIsEdit(true)}>Edit</Button>
                        <Button basic color='red'>Delete</Button>
                    </div>
                }
            </div>
            </Card.Content>
            </Card>
        </div>
    )
}
export default Food 