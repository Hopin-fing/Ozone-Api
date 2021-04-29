import React from 'react'
import 'materialize-css'
import Home from "./pages/Home";
import {Route, Switch} from "react-router-dom";
import Profile from "./pages/Profile";

function App() {

  return (
    <div className="had-container">
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/profile/:name" component={Profile}/>
        </Switch>
    </div>
  );
}

export default App;
