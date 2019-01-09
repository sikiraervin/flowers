import React from 'react';
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
} from 'mdbreact';

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

    close() {
        this.toggle();
        this.props.hideLoginModal();
    }

    login(){
        if(this.state.loginInProgress || this.state.email === '' || this.state.password === ''){
            return;
        }

        this.setState({
            loginInProgress: true
        });

        fetch('https://flowrspot-api.herokuapp.com/api/v1/users/login', {
            method: 'post',
            headers: {
                contentType: 'application/json'
            },
            body: {
                email: 'vetting@poviolabs.com', //this.state.email,
                password: 'wNjpPC9B7EY734AvCQ', //this.state.password
            }
        }).then(response => {
            return response.json();
        })
        .then(rawData => { 
            console.log(rawData);
            
            this.setState({
                loginInProgress: false
            });
        });
    }

    emailChanged = event => {
        console.log('Email changed');
        console.log(event.target.value);
    }

    passwordChanged = event => {
        console.log('Password changed');
        console.log(event.target.value);
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
                            onChange={(event)=>this.emailChanged(event)} 
                            placeholder='Email'
                        />
                        <input 
                            className='Form__Input max--width'
                            type="password" 
                            onChange={event => this.passwordChanged(event)}
                            placeholder='Password'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.login}>Login to your account</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}
