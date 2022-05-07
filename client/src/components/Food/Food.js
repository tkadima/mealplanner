import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn} from 'mdb-react-ui-kit';

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

    let colorDict = {
        'dairy': 'info', 
        'fruit': 'danger',
        'grain': 'warning',
        'protein': 'secondary',
        'other': 'dark',
        'vegetable': 'success'

    }

    return (
        <MDBCard className='food' border={colorDict[props.foodGroup]}>
            <MDBCardImage src={displayImage()}  position='top' />
            <MDBCardBody>
                <MDBCardTitle>{props.name}</MDBCardTitle>
                <MDBCardText>{props.description}</MDBCardText>
                <Link to={`/fridge/update/${props.foodId}`}>
                    <MDBBtn className='food__button--edit'>Edit</MDBBtn>
                </Link>
                <MDBBtn color='danger' className='food__button--delete'onClick={() => props.onDelete(props.foodId)}>Delete</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    )
}
export default Food 