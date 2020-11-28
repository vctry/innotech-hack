import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import {Navbar} from "./components/Navbar";
import {Images} from "./pages/Images";
import {Links} from "./pages/Links";

function App() {
  return (
    <div className="container-fluid">
        <Router>
            <Navbar />
            <Route path='/images' component={Images}/>
            <Route path='/links' component={Links}/>
        </Router>
    </div>
  );
}

export default App;
