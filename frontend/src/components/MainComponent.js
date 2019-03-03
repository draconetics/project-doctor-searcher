import React, {Component} from 'react';
import Header from "./HeaderComponent";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./HomeComponent";
import DoctorList from "./DoctorListComponent";
import DoctorForm from "./DoctorFormComponent";
import axios from 'axios';

class Main extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            urlBackend:'http://localhost:4000'
        }
        console.log("Main constructor es invocado");
    }



    render() {

        let doctorForm = (history)=>{
            return <DoctorForm  urlBackend = {this.state.urlBackend} 
                                 />
        };

        console.log("Main render es invocado");
        console.log(this.props);
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route exact path='/doctor' component={DoctorList}/>
                    <Route path='/doctor/form'  render={({history})=>(
                    <div> 
                        <DoctorForm  urlBackend = {this.state.urlBackend} 
                                history={history} />
                    </div>
                )
                }/>                
                    <Redirect to="/home"/>
                </Switch>

            </div>
        );
    }
}

export default Main;