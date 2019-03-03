import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import {BrowserRouter} from "react-router-dom";

import Main from "./components/MainComponent";

class App extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
/*        console.log("didmount");
        axios.get(`https://api.github.com/users`)
          .then(res => {
            const persons = res.data;
            this.setState({ persons });
            console.log(this.state.persons);
          }).catch((error)=>{
            return new Error(error);
          });*/
    }


    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Main />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
