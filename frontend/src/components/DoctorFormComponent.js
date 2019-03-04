import React, {Component} from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';


class DoctorForm extends Component {

    constructor(props, context) {
        super(props, context);
        const editDoctor = this.props.editDoctor;
        console.log(this.props);
        this.state = {
            firstname: (editDoctor)?editDoctor.name:'',
            lastname: (editDoctor)?editDoctor.last_name:'',
            title: (editDoctor)?editDoctor.title:'',
            email: (editDoctor)?editDoctor.email:'',
            touched: {
                firstname: false,
                lastname: false,
                title: false,
                email: false
            },
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        console.log("DoctorForm constructor es invocado");
    }

    validate(firstname, lastname, title, email) {
        const errors = {
            firstname: '',
            lastname: '',
            title: '',
            email: ''
        };

        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';
        else if (this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if (this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last Name should be <= 10 characters';

        if (this.state.touched.title && title.length < 3)
            errors.title = 'Title should be >= 3 characters';
        else if (this.state.touched.title && title.length > 50)
            errors.title = 'Title should be <= 50 characters';

        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';

        return errors;
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(
            {
                [name]: value
            }
        );
    }

    handleSubmit(event) {
        console.log("handleSubmit");
        event.preventDefault();
        //console.log(datos);
        //console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        // evita que el browser por defecto vaya a la pagina siguiente
        let objetoDoctor = {
            name: this.state.firstname,
            last_name: this.state.lastname,
            title: this.state.title,
            email: this.state.email
        };
        
        axios.post(this.props.urlBackend + '/doctor', objetoDoctor).then(response => {
          console.log("send the doctor");
          console.log(response);
          this.props.refreshDoctors();
          this.props.history.push({
             pathname:"/doctor",
             state:{
                 doctorUpdated:response.data
              }
            });
        }).catch((error)=>{
            console.log(error);
        });
    }


    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true},
        });
    };

    createForm() {
        
      const errors = this.validate(this.state.firstname, this.state.lastname, this.state.title, this.state.email);

        return (
                  <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname"
                                           placeholder="First Name"
                                           value={this.state.firstname}
                                           valid={errors.firstname === ''}
                                           invalid={errors.firstname !== ''}
                                           onBlur={this.handleBlur('firstname')}
                                           onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname"
                                           placeholder="Last Name"
                                           value={this.state.lastname}
                                           valid={errors.lastname === ''}
                                           invalid={errors.lastname !== ''}
                                           onBlur={this.handleBlur('lastname')}
                                           onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="title" md={2}>Title:</Label>
                                <Col md={10}>
                                    <Input type="text" id="title" name="title"
                                           placeholder="Title or especialization"
                                           value={this.state.title}
                                           valid={errors.title === ''}
                                           invalid={errors.title !== ''}
                                           onBlur={this.handleBlur('title')}
                                           onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.title}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                           placeholder="Email"
                                           value={this.state.email}
                                           valid={errors.email === ''}
                                           invalid={errors.email !== ''}
                                           onBlur={this.handleBlur('email')}
                                           onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                
                    <Button>Submit</Button>
              </Form>
            );
    }

    render() {

        console.log("Form render es invocado");
        //console.log(this.props.users);
        return (
            <div>
                <Container>
                    <Row>
                        <Col>{ this.createForm() }</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DoctorForm;