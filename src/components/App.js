import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import Planner from './Planner'
import Home from './Home'
import Layout from './Layout'
import './App.scss'

const foodGroups = [
  {'id': 1, 'name': 'Dairy', 'subcategories': ['dairy']},
  {'id': 2, 'name': 'Fruit',  'subcategories': ['fruits' ]},
  {'id': 3, 'name': 'Grain', 'subcategories': ['bread', 'bakery', 'grains', 'flours', 'rice']},
  {'id': 4, 'name': 'Protein', 'subcategories': ['seafood', 'fish', 'meat', 'egg']},
  {'id': 5, 'name': 'Vegetable','subcategories': ['vegetables']}, 
  {'id': 6, 'name': 'Legumes, Nuts and Seeds', 'subcategories':['legumes', 'nuts', 'seeds']}
]
function App() {
  return (
    <Layout>
      <div className="App">
        <Router>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/planner">
              <Planner foodGroups={foodGroups}/> 
            </Route>
        </Router>
      </div>
    </Layout>
  );
}

export default App;
