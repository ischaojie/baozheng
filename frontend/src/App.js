import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import SourceJudge from "./mark/sourceJudge";
import SourceList from "./mark/datasetList";
import Login from "./mark/login";
import Header from "./mark/header"
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div>
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/"><SourceList /></Route>
                    <Route path="/judge"><SourceJudge /></Route>
                    <Route path="/login"><Login /></Route>
                </Switch>
            </Router>
        </div>

    );
}

export default App;
