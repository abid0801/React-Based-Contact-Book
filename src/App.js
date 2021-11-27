import React from "react";
import { ToastContainer } from "react-bootstrap";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";

const App = ()=> {
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Switch>
          <Route exact path ="/" component= {()=><Home/>} />
          <Route exact path ="/add">
              <h1>I am add compoents</h1>
          </Route>
          
      </Switch>

    
    </div>
  );
}

export default App;
