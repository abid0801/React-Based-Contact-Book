import React from "react";
import { ToastContainer } from "react-bootstrap";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
const App = ()=> {
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Switch>
          <Route exact path ="/" component= {()=><Home/>} />
          <Route exact path ="/add">
              <AddContact/>
          </Route>
          
      </Switch>

    
    </div>
  );
}

export default App;
