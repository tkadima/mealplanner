import { Message } from 'semantic-ui-react'

const ErrorComponent = ({message}) => {
    return (
        <Message error>
            <Message.Header>Error: {message}</Message.Header>
        </Message>
    )
}
export default ErrorComponent