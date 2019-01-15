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
import { SUCCESSFULL_SIGNUP } from '../constants'
import { connect } from 'react-redux';
import UserAuthActions from '../actions/UserAuthActions';
import { AlertDialog } from './AlertDialog';

const mapStateToProps = state => state

class SignupModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSignupModal: this.props.showSignupModal,
            signupInProgress: false,
            dateOfBirth: new Date(),
            formatedDate: new Date(),
            name: '',
            lastName: '',
            email: '',
            password: '',
            showAlert: false,
            showLoginAfterRegister: false,
            alertMessage: SUCCESSFULL_SIGNUP
        };

        this.register = this.register.bind(this);
        this.dateOfBirthChanged = this.dateOfBirthChanged.bind(this);
        this.onAlertDismiss = this.onAlertDismiss.bind(this);
    }

    toggle = () => {
        this.setState({
            showSignupModal: !this.state.showSignupModal
        });

        this.props.onClose && this.props.onClose(null, false, this.state.showLoginAfterRegister);
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
        });
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            signupInProgress: false
        });

        if(nextProps && nextProps.showSignupModal){
            this.setState({
                showSignupModal: true
            })
        }

        if (nextProps && nextProps.UserAuthReducer && nextProps.UserAuthReducer.auth_token) {
            this.setState({
                showAlert: true
            })
        }
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

        let { dispatch } = this.props;

        let userData = {
            name: this.state.name,
            lastName: this.state.lastName,
            dateOfBirth: this.state.formatedDate,
            email: this.state.email,
            password: this.state.password
        };

        dispatch(UserAuthActions.userSignupRequest({...userData}));

        client.signup({...userData})
        .then(
            (response) => {
                this.setState({
                    showLoginAfterRegister: true
                });

                dispatch(UserAuthActions.userSignupSuccess(response, userData));
            },
            error => {
                this.setState({
                    alertMessage: 'There appears to be an issue with your request: \n' + error,
                    showAlert: true
                })

                dispatch(UserAuthActions.userSignupFailure(error))
            }
        );
    }

    onAlertDismiss(){
        this.toggle();
    }

    render() {
        return (
            <Container>
                <Modal
                    className='Signup__Modal'
                    isOpen={this.state.showSignupModal}
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
                        <AlertDialog
                            showAlert={this.state.showAlert}
                            ref='alert'
                            message={this.state.alertMessage}
                            onCloseCallback={this.onAlertDismiss}
                        />
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default connect(mapStateToProps, null)(SignupModal)
