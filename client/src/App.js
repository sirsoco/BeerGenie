import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase'
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"



function App() {
  
  return (
    <Router>
      <div>
    
        <Switch>
          <Route exact path ="/" component ={SignUp}/>
          <Route exact path ="/Home"
          component ={Home}/>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
