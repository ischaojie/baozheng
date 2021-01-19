import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import SourceJudge from "./mark/sourceJudge";
import DatasetList from "./mark/datasetList";
import DatasetDetail from "./mark/datasetDetail";
import Login from "./mark/login";
import Header from "./mark/header"
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div>
            <Header/>
            <Router>
                <Switch>
                    <Route exact path="/dataset" component={DatasetList}/>
                    <Route path="/dataset/:id" component={DatasetDetail}/>
                    <Route path="/judge"><SourceJudge/></Route>
                    <Route path="/login"><Login/></Route>
                </Switch>
            </Router>
        </div>

    );
}

export default App;
