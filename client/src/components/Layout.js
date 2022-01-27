import { Container, Menu } from 'semantic-ui-react'
const Layout = ({children}) => {
    return (
        <div className="layout">
          <Menu
           inverted
            borderless
            fixed="top"
            className="layout-navbar">
                <Container>
                    <Menu.Item header>Meal Planner </Menu.Item>
                    <Menu.Item as='a' href="\">Home</Menu.Item>
                    <Menu.Item as='a' href="\planner">Calendar</Menu.Item>
                    <Menu.Item as='a' href="\fridge">View Your Fridge</Menu.Item>
                </Container>
            </Menu>
            
            <div className="layout-content">
                {children}
            </div>
            
        </div>
    )
}

export default Layout