import React from 'react'
import { Icon } from 'semantic-ui-react'
import Food from './Food'

const Home = () => {
  return(
    <div className="container">
      <h1 className="header">
        Home page
      </h1>
      <Food></Food>
      <Icon color="teal" name="plus circle" size='large'></Icon>
    </div>
  )
}

export default Home