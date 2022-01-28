import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import Planner from './Planner'
import Home from './Home'
import Layout from './Layout'
import Fridge from './Fridge';
import CreateFood from './CreateFood'
import './App.scss'

function App() {

  return (
    <Layout>
      <div className="App">
        <Router>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/planner">
              <Planner /> 
            </Route>
            <Route exact path="/fridge">
              <Fridge></Fridge>
            </Route>
            <Route path="/fridge/new">
              <CreateFood />
            </Route>
        </Router>
      </div>
    </Layout>
  );
}

export default App;
