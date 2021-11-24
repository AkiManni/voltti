import logo from './logo.svg';

import { Container, Row, Col } from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
//import UserList from "./components/User/UserList";
//import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import { Provider } from 'react-redux';
import Navbar from "./Components/User/Navbar";
import SimpleForm from "./Components/User/SimpleForm";
import { Alert } from "react-bootstrap";
import Register from "./Components/User/Register";
import Home from './Components/Home';
function App() {
  return (

    //Tähän väsätty tämmönen, millä näkyy kirjautuminen ja navbar
<Router>

  <div>
  <Navbar/>
  <Switch>
  <Route path="/login" exact component={Login} />
  <Route path="/register" exact component={Register} />
  <Route path="/home" exact component={Home} />
    </Switch>

  </div>

  </Router>
  );
}
 
export default App;
