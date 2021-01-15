import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import SourceJudge from "./mark/sourceJudge";
import SourceList from "./mark/SourceList";
import Header from "./mark/header"
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div>
            <Header/>
        </div>
    );
}

export default App;
