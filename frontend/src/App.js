import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import DatasetMark from "./mark/datasetMark"
import DatasetList from "./mark/datasetList"
import DatasetDetail from "./mark/datasetDetail"
import DatasetAll from "./mark/datasetAll"
import Login from "./mark/login"
import Header from "./mark/header";
import NotFound from "./mark/404";
import Footer from "./mark/footer";

function App({location}) {
    const exclusionArray = [
        '/signin',
        '/mark',
    ]
    return (
        <div>
            {/*exclude login and mark page with header and footer*/}
            {exclusionArray.indexOf(location.pathname) < 0 && <Header/>}
            <Switch>
                <Route path="/signin" component={Login}/>
                <Route path="/mark" component={DatasetMark}/>

                <Route path="/home" component={DatasetList}/>
                <Route path="/datasets" component={DatasetAll}/>
                <Route path="/dataset/:id" component={DatasetDetail}/>
                <Route path="*" component={NotFound}/>

            </Switch>
            {exclusionArray.indexOf(location.pathname) < 0 && <Footer/>}
        </div>);
}

export default withRouter(App);
