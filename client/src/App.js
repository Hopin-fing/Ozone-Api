import React from 'react'
import 'materialize-css'
import Home from "./pages/Home";
import {Route, Switch} from "react-router-dom";
import Product from "./pages/Product";
import List from "./pages/List";

function App() {

  return (
    <div className="had-container">
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/list/:name" component={List}/>
            <Route path="/product/:name" component={Product}/>
            <Route path="*" component={Home}/>

        </Switch>
    </div>
  );
}

export default App;
