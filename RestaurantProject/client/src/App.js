import './styles/App.css';
import MenuSection from './components/Menu';
import Header from '../src/components/Header';
import CategorySection from "./components/CategorySection";
import RegisterSection from './components/RegisterSection';
import Login from './components/Login';
import { BrowserRouter as Router,  Switch,  Route} from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <Header/> 
      <Switch>
        <Route path="/Menu">
          <MenuSection/>
        </Route>
        <Route path="/Login">
          <Login/>
        </Route>
        <Route path="/Register">
          <RegisterSection/>
        </Route>
        <Route path="/">
          <CategorySection/>
        </Route>          
      </Switch>
    </Router>
    </>
  );
  
}

export default App;
