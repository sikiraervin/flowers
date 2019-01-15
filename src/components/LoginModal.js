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
import UserAuthActions from '../actions/UserAuthActions';
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
        this.onAlertDismiss = this.onAlertDismiss.bind(this);
    }

    toggle = () => {
        this.setState({
            showLoginModal: !this.state.showLoginModal
        });

        this.props.onClose && this.props.onClose(null, false);
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
        this.setState({
            loginInProgress: false
        });

        if(nextProps && nextProps.showLoginModal){
            this.setState({
                showLoginModal: true
            })
        }

        if (
            nextProps && 
            nextProps.showLoginModal && 
            nextProps.UserAuthReducer && 
            nextProps.UserAuthReducer.auth_token &&
            this.refs &&
            this.refs.alert &&
            this.refs.alert.toggle
        ) {
            this.refs.alert.toggle();
        }

        if(nextProps && nextProps.UserAuthReducer && nextProps.UserAuthReducer.error){
            //Here we can handle the case if the user login failed
            // 1. Show an friendly user message if its an API error
            // 2. Indicate the user he might provided wrong login creds 
            // etc...
        }
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

    onAlertDismiss(type){
        this.setState({
            showLoginModal: false,
            showUserProfile: false
        })

        typeof type === 'undefined' && this.props.dispatch(UserAuthActions.showUserSection());
        typeof type === 'string' && type === 'profile' && this.props.dispatch(UserAuthActions.showUserProfile());
    }

    render() {
        return (
            <Container>
                <Modal
                    isOpen={this.state.showLoginModal}
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
                        <Button onClick={this.login} style={{marginRight: '22%'}}>Login to your account</Button>
                        <AlertDialog
                            showAlert={false}
                            ref='alert'
                            message={SUCCESSFULL_LOGIN}
                            onCloseCallback={this.onAlertDismiss}
                            />
                    </ModalFooter>
                </Modal>
            </Container>
        )
    }
}

export default connect(mapStateToProps, null)(LoginModal)