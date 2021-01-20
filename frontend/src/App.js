import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import DatasetMark from "./mark/datasetMark";
import DatasetList from "./mark/datasetList";
import DatasetDetail from "./mark/datasetDetail";
import Login from "./mark/login";
import Header from "./mark/header"

function App() {
    return (
        <div>
            <Header/>
            <Router>
                <Switch>
                    <Route exact path="/" component={DatasetList}/>
                    <Route path="/dataset/:id" component={DatasetDetail}/>
                    <Route path="/mark"><DatasetMark/></Route>
                    <Route path="/login"><Login/></Route>
                </Switch>
            </Router>
        </div>

    );
}

export default App;
