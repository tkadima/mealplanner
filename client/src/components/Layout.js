import { Container, Menu } from 'semantic-ui-react'
const Layout = ({children}) => {
    return (
        <div className="Layout">
          <Menu
            borderless
            fixed="top"
            className="Layout-navbar">
                <Container>
                    <Menu.Item header>Meal Planner </Menu.Item>
                    <Menu.Item as='a' href="\">Home</Menu.Item>
                    <Menu.Item as='a' href="\planner">Calendar</Menu.Item>
                    <Menu.Item as='a' href="\ingredients">View Your Fridge</Menu.Item>
                </Container>
            </Menu>
            
            <div className="Layout-content">
                {children}
            </div>
            
        </div>
    )
}

export default Layout