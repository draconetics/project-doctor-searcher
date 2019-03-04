import React, {Component} from 'react';
import DoctorForm from './DoctorFormComponent';
import DoctorList from './DoctorListComponent';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';

class MainDoctor extends Component {
	constructor( props, context) {
		super(props,context);

        
        this.state = {
            doctors: null,
            editDoctor: null,
            urlBackend:'http://localhost:4000'
        };
        console.log("MainDoctor constructor es invocado");
        console.log(this.props);
	}

    componentDidMount() {
        console.log("MaindDoctor didmount !!");
        this._refreshDoctors();
    }

    _refreshDoctors() {
        //updating doctors list
        axios.get('http://localhost:4000/doctor').then((res) => {
          console.log(res.data);
          this.setState({
            doctors: res.data
          });
        }).catch((error)=>{
            console.log(error);
           // console.log(new Error(error));
        });
    }



	render() {
        //when a doctor is edited.
        console.log(this.props);
        let doctorParameter = (this.props.location && this.props.location.state)?this.props.location.state.doctorUpdated:null;

        let doctorList = ()=>{
            //this._refreshDoctors();
            return <DoctorList  doctors={this.state.doctors} 
                                doctorUpdated={doctorParameter}/>
        };

        let doctorForm = ({history})=>{
            return <DoctorForm  urlBackend = {this.state.urlBackend} 
                                />
        };

        console.log("Main render es invocado");
        console.log(this.props);
        return (
            <div>
            	MainDoctor
                <Switch>
                    <Route exact path='/doctor' component={doctorList}/>
                    <Route path='/doctor/form'  render={({history})=>(
                    <div>
                        <DoctorForm     history={history} 
                                        urlBackend={this.state.urlBackend}
                                        refreshDoctors= {()=>(
                                            this._refreshDoctors())}
                                        />
                    </div>
                )
                    }/>                
                </Switch>
            </div>
        );
    }
}

export default MainDoctor;

/*
<Switch>
                    <Route path='/doctor/form'  render={({history})=>(
                    <div> 
                        <DoctorForm      
                                        history={history} 
                                        />
                    </div>
                )
                }/>                
                </Switch>
                */