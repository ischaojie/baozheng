import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import DatasetMark from "./mark/datasetMark"
import DatasetList from "./mark/datasetList"
import DatasetDetail from "./mark/datasetDetail"
import Login from "./mark/login";
import Header from "./mark/header";

function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={DatasetList}/>
                <Route exact path="/dataset/:id" component={DatasetDetail}/>
                <Route exact path="/mark" component={DatasetMark}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </Router>

    );
}

export default App;
