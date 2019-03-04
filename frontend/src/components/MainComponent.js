import React, {Component} from 'react';
import Header from "./HeaderComponent";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./HomeComponent";
import MainDoctor from "./MainDoctorComponent";
import DoctorForm from "./DoctorFormComponent";
import axios from 'axios';

class Main extends Component {

    constructor(props, context) {
        super(props, context);
        
        console.log("Main constructor es invocado");
    }



    render() {

        console.log("Main render es invocado");
        return (
            <div>
                <Header/>
                <Switch>
                
                    <Route path='/home' component={Home}/>     
                    <Route  component={MainDoctor}/>
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }
}

export default Main;