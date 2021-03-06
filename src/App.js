import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/NavBar/Navbar.js";
import { Route, Switch } from "react-router-dom";
import Home from "./components/DashBoard/Home";
const App = ()=> {
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Switch>
          <Route exact path ="/" component= {()=><Home/>} />
          
      </Switch>

    
    </div>
  );
}

export default App;
