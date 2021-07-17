import './App.css';

import Dishes from './components/Dishes'
import Discounts from './components/Discounts'
import Categories from './components/Categories'
import Clients from './components/Clients'
import TabDish from './components/TabDish'
import TabDiscount from './components/TabDiscount'
import Stock from './components/Stock'
import TabCategories from './components/TabCategories'
import Orders from './components/Orders'
import Home from './components/Home'
import OrdersFinals from './components/OrdersFinals'
import Radar from './components/statistics/Radar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  
  

  return (
    <div className="App">
        <Router >
          <div className="navegation_page">
            <nav>
              <ul className="nav_container">
                <li>
                <Link to='/'> &#9698; Home</Link> 
                </li>
                <li>
                <Link to='/Dishes'>&#9698; Comidas</Link> 
                </li>
                <li>
                <Link to='/Discounts'>&#9698; Descuentos</Link> 
                </li>
                <li>
                <Link to='/Categories'>&#9698; Categorias</Link> 
                </li>
                <li>
                <Link to='/Orders'>&#9698; Detalles</Link> 
                </li>
                <li>
                <Link to='/OrdersFinals'>&#9698; Ordenes</Link> 
                </li>
                <li>
                <Link to='/Stock'>&#9698; Stock</Link> 
                </li>
                <li>
                <Link to='/Clients'>&#9698; Clientes</Link> 
                </li>
                
              </ul>
            </nav>    
          </div>
          <div className="content_page">
            <Switch>
                <Route path='/Dishes'>
                  <TabDish/>
                  <Dishes/>
                </Route>

                <Route path='/Discounts'>
                  <TabDiscount/>
                  <Discounts/>
                </Route>

                <Route path='/Categories'>
                  <div className="cat">
                    <TabCategories/>
                    <Categories/>
                    <Radar/>
                  </div>
                  
                </Route>

                <Route path='/Orders'>
                  <Orders/>
                </Route>
                
                <Route path='/OrdersFinals'>
                  <OrdersFinals/>
                </Route>
                
                <Route path='/Clients'>
                  <Clients/>
                </Route>
                <Route path='/Stock'>
                  <Stock/>
                </Route>

                <Route path='/'>
                  
                  <Home/>
                </Route>

              </Switch>
          </div>
      </Router>
      
      


    </div>
  );
}

export default App;
