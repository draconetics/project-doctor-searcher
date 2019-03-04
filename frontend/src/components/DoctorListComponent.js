import React, {Component} from 'react';
import axios from 'axios';
import { Table, Row, Container, Button } from 'reactstrap';
import {  Link } from 'react-router-dom';
import Message from './MessageComponent';

class DoctorList extends Component {


    constructor(props, context) {
        super(props, context);
        
        console.log(this.props);
        console.log("doctorlist constructor");
    }


/*   editDoctor(doctor) {
    console.log("changing the data");
    this.setState({
      editDoctor: doctor
    }, this.props.history.push({ pathname:"/doctor/form"  }) );
    
  }*/

  updateBook(){
    let {title, rating} = this.state.editBookData;
    axios.put('http://localhost:3001/books/' + this.state.editBookData.id, {title,rating})
    .then((response) => {
      this._refreshBooks();
      this.setState({
        editBookModal: false, editBookData: {id:'',title:'', rating:''}
      });
    });
  }



    render() {
        //<Button color="secondary" size="sm" tag={Link} to="/doctor/form">Delete</Button>
        const doctors = this.props.doctors;
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
                                <Button color="primary" size="sm" onClick={(doctor)=>this.editDoctor(doctor)}>Edit</Button>
                                <Button color="secondary" size="sm" tag={Link} to="/doctor/form">Delete</Button>
                            </td>
                </tr>);
        });
        console.log("render DoctorList es invocado");
        console.log(this.props);
        console.log(this.props.doctorUpdated);

        return (
            <div>
            <Container>
               <Message object={this.props.doctorUpdated}/>
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