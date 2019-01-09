import React from 'react';
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter 
} from 'mdbreact';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
 

export class SignupModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show,
            signupInProgress: false,
            dateOfBirth: new Date(),
        };

        this.register = this.register.bind(this);
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    }

    close() {
        this.toggle();
        this.props.hideSignupModal();
    }

    register(){

    }

    nameChanged = event => {
        console.log('Name changed');
        console.log(event.target.value);
    }

    lastNameChanged = event => {
        console.log('Last Name changed');
        console.log(event.target.value);
    }

    emailChanged = event => {
        console.log('Email changed');
        console.log(event.target.value);
    }

    passwordChanged = event => {
        console.log('Password changed');
        console.log(event.target.value);
    }

    dateOfBirthChanged(date){
        console.log('DoB changed');
        console.log(date);
    }

    render() {
        return (
            <Container>
                <Modal 
                    className='Signup__Modal'
                    isOpen={this.state.show} 
                    toggle={this.toggle} 
                >
                    <ModalHeader toggle={this.toggle}>Create Your Account</ModalHeader>

                    <ModalBody>
                        <input 
                            className="Form__Input Name__Fields"
                            type="text" 
                            onChange={(event)=>this.nameChanged(event)} 
                            placeholder='Name'
                        />
                         <input 
                            className="Form__Input Name__Fields"
                            type="text" 
                            onChange={(event)=>this.emailChanged(event)} 
                            placeholder='Last Name'
                        />

                        <DatePicker
                            selected={this.state.dateOfBirth}
                            onChange={this.dateOfBirthChanged}
                        />

                        <input 
                            className="Form__Input max--width"
                            type="email" 
                            onChange={(event)=>this.emailChanged(event)} 
                            placeholder='Email'
                        />
                        <input 
                            className="Form__Input max--width"
                            type="password" 
                            onChange={event => this.passwordChanged(event)}
                            placeholder='Password'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={this.register}>
                               Create Account
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}
