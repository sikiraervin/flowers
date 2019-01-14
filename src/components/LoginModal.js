import React from 'react';

import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
} from 'mdbreact';

import { connect } from 'react-redux';
import { AlertDialog } from './AlertDialog';
import { SUCCESSFULL_LOGIN } from '../constants';
import UserAuthActions from '../actions/UserAuthActions'
import client from '../client.js';

const mapStateToProps = state => state

class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoginModal: this.props.showLoginModal,
            loginInProgress: false,
            email: '',
            password: ''
        };

        this.login = this.login.bind(this);
    }

    toggle = () => {
        this.setState({
            showLoginModal: !this.state.showLoginModal
        });
    }

    login() {
        if (this.state.loginInProgress || this.state.email === '' || this.state.password === '') {
            return;
        }

        this.setState({
            loginInProgress: true
        });

        let { dispatch } = this.props;

        dispatch(UserAuthActions.userLoginRequest({
            email: this.state.email,
            password: this.state.password
        }));

        client.login({
            email: this.state.email,
            password: this.state.password
        }).then(
            response => dispatch(UserAuthActions.userLoginSuccess(response)),
            error => dispatch(UserAuthActions.userLoginFailure(error))
        );
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);

        if(nextProps && nextProps.showLoginModal){
            this.setState({
                showLoginModal: true
            })
        }

        if (nextProps && nextProps.UserAuthReducer.auth_token) {
            this.refs.alert.toggle();
        }

        if(nextProps && nextProps.UserAuthReducer.error){
            //Here we can handle the case if the user login failed
        }

        this.setState({
            loginInProgress: false
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

export default connect(mapStateToProps, null)(LoginModal)