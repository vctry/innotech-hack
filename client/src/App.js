import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Navbar} from "./components/Navbar";
import {Images} from "./pages/Images";
import {Home} from "./pages/Home";
import {Statistics} from "./pages/Statistics";

function App() {
  return (
    <div className="container-fluid">
        <Router>
            <Navbar />
            <Switch>
                <Route path='/images' component={Images}/>
                <Route path='/statistics' component={Statistics} />
                <Route path='/' component={Home}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
