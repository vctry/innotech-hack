import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Navbar} from "./components/Navbar";
import {Images} from "./pages/Images";
import {Links} from "./pages/Links";
import {Home} from "./pages/Home";

function App() {
  return (
    <div className="container-fluid">
        <Router>
            <Navbar />
            <Switch>
                <Route path='/images' component={Images}/>
                <Route path='/links' component={Links}/>
                <Route path='/' component={Home}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
