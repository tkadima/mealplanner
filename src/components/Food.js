import { Card, Icon, Image, Input } from 'semantic-ui-react'
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
            <Card>
                <Image src={imageUrl} ui={false} />
                <Input type='file' 
                    className='imageFile' 
                    hidden={!isEdit && !props.isNew} 
                    onChange={(e) => setImage(e.target.files[0])}/>
            <Card.Content>
                {
                    isEdit && props.isNew ? <Input name='name' value={name} onChange={e => handleEditting(e)}/> :
                    <Card.Header className='food-card-header'>{name}</Card.Header>
                }
                <Card.Description>
                    {
                        isEdit ? 
                        <Input name='description' value={description} onChange={e => handleEditting(e)}/>
                        : 
                        <Card.Header className= 'food-card-description'>{description}</Card.Header>
                    }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {
                    isEdit ? 
                    <Icon name='save' onClick={() => {
                        setIsEdit(false)
                        props.onSaveChanges(name, description, props.isNew)
                    }}/> : 
                    <div>
                        <Icon name='pencil' onClick={() => setIsEdit(true)}></Icon>
                        <Icon name="trash"></Icon>
                    </div>
                }
            </Card.Content>
            </Card>
        </div>
    )
}
export default Food 