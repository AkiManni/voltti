
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/User/Login";
import Navibar from "./Components/User/Navibar";
import Register from "./Components/User/Register";
import Home from './Components/Home';
function App() {
  return (

    //Tähän väsätty tämmönen, millä näkyy kirjautuminen ja navbar
<Router>

  <div>
  <Navibar/>
  <Switch>
  <Route path="/login" exact component={Login} />
  <Route path="/register" exact component={Register} />
  <Route path="/" exact component={Home} />
  
    </Switch>

  </div>

  </Router>
  );
}
 
export default App;