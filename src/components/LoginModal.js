import React from 'react';

import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
} from 'mdbreact';

import { AlertDialog } from './AlertDialog';
import { SUCCESSFULL_LOGIN } from '../constants';

import client from '../client.js';

export class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show,
            loginInProgress: false,
            email: '',
            password: ''
        };

        this.login = this.login.bind(this);
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    }

    login() {
        if (this.state.loginInProgress || this.state.email === '' || this.state.password === '') {
            return;
        }

        this.setState({
            loginInProgress: true
        });

        client.login({
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                if (res && res.auth_token) {
                    //TODO: Store the token
                    this.refs.alert.toggle();
                }

                this.setState({
                    loginInProgress: false
                });
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

    render() {
        return (
            <Container>
                <Modal
                    isOpen={this.state.show}
                    toggle={this.toggle}
                    className='Login__Modal'
                >
                    <ModalHeader toggle={this.toggle}>Welcome Back</ModalHeader>
                    <ModalBody>
                        <input
                            className='Form__Input max--width'
                            type="email"
                            onChange={(event) => this.emailChanged(event)}
                            placeholder='Email'
                        />
                        <input
                            className='Form__Input max--width'
                            type="password"
                            onChange={event => this.passwordChanged(event)}
                            placeholder='Password' />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.login}>Login to your account</Button>
                        <AlertDialog
                            show={false}
                            ref='alert'
                            message={SUCCESSFULL_LOGIN}>
                        </AlertDialog>
                    </ModalFooter>
                </Modal>
            </Container>
        )
    }
}
