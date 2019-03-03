import React, {Component} from 'react';
import axios from 'axios';
import { Table, Row, Container, Button } from 'reactstrap';
import {  Link } from 'react-router-dom';
import Message from './MessageComponent';

class DoctorList extends Component {


    constructor(props, context) {
        super(props, context);
        let doctorParameter = this.props.location.state.doctorUpdated;
        this.state = {
            doctors: null,
            doctorUpdated: (doctorParameter)?doctorParameter:null
        };
        console.log("Main constructor es invocado");
    }

    componentDidMount() {
        console.log("didmount !!");
        this._refreshDoctors();
    }

    _refreshDoctors() {
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

        const doctors = this.state.doctors;
        if(doctors == null){
            return (<div></div>);
        }

        let doctor_rows = doctors.map((doctor,index)=>{
            
            return(<tr key={index}>
                            <td>{index}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.last_name}</td>
                            <td>{doctor.title}</td>
                            <td>{doctor.email}</td>
                            <td>
                                <Button color="primary" size="sm" tag={Link} to="/doctor/form">Edit</Button>
                                <Button color="secondary" size="sm" tag={Link} to="/doctor/form">Delete</Button>
                            </td>
                </tr>);
        });
        console.log("DoctorList es invocado");
        console.log(this.state);
        console.log(this.props);

        return (
            <div>
            <Container>
                <Message object={this.state.doctorUpdated}/>
                <Row>
                <div>
                    <Button color="danger" tag={Link} to="/doctor/form" >
                        Add New Item
                    </Button>
                </div>
                 <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                        {doctor_rows}
                    </tbody>
                  </Table>
            
            </Row>
            </Container>
            </div>
        );
    }
}

export default DoctorList;