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
import client from '../client';


export class SignupModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show,
            signupInProgress: false,
            dateOfBirth: new Date(),
            formatedDate: '',
            name: '',
            lastName: '',
            email: '',
            password: ''
        };

        this.register = this.register.bind(this);
        this.dateOfBirthChanged = this.dateOfBirthChanged.bind(this);
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    }

    nameChanged = event => {
        this.setState({
            name: event.target.value
        });
    }

    lastNameChanged = event => {
        this.setState({
            lastName: event.target.value
        });
    }

    emailChanged = event => {
        this.setState({
            email: event.target.value
        });
    }

    passwordChanged = event => {
        this.setState({
            password: event.target.value
        });
    }

    dateOfBirthChanged(date) {
        let year = date.getFullYear();

        let month = date.getMonth() + 1;
        month = (month < 10 ? '0' + month : month);

        let day = date.getDate();
        day = (day < 10 ? '0' + day : day);

        this.setState({
            dateOfBirth: date,
            formatedDate: year + '/' + month + '/' + day,
        }, () => {
            console.log(this.state.formatedDate);
        });
    }

    register() {
        if (
            this.state.signupInProgress ||
            this.state.name === '' ||
            this.state.lastName === '' ||
            this.state.email === '' ||
            this.state.password === ''
        ) {
            return;
        }

        this.setState({
            signupInProgress: true
        });

        client.signup({
            name: this.state.name,
            lastName: this.state.lastName,
            dateOfBirth: this.state.formatedDate,
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                if (res) {
                    console.log(res);
                }

                this.setState({
                    signupInProgress: false
                });
            });
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
                            onChange={(event) => this.nameChanged(event)}
                            placeholder='Name'
                        />
                        <input
                            className="Form__Input Name__Fields"
                            type="text"
                            onChange={(event) => this.lastNameChanged(event)}
                            placeholder='Last Name'
                        />

                        <DatePicker
                            dateFormat="MMMM d, yyyy"
                            selected={this.state.dateOfBirth}
                            onChange={this.dateOfBirthChanged}
                        />

                        <input
                            className="Form__Input max--width"
                            type="email"
                            onChange={(event) => this.emailChanged(event)}
                            placeholder='Email'
                        />

                        <input
                            className="Form__Input max--width"
                            type="password"
                            onChange={event => this.passwordChanged(event)}
                            placeholder='Password' />

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
