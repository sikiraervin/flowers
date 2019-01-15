import React from 'react';

import {
    Modal,
    ModalBody,
    ModalHeader,
    Button
} from 'mdbreact';

import { SUCCESSFULL_LOGIN, SUCCESSFULL_SIGNUP } from '../constants'

export class AlertDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: this.props.showAlert,
            message: this.props.message
        }

        this.dismissAlert = this.dismissAlert.bind(this);
        this.dismissAlertShowProfile = this.dismissAlertShowProfile.bind(this);
    }

    toggle = () => {
        this.setState({
            showAlert: !this.state.showAlert
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.showAlert !== this.state.showAlert){
            this.setState({
                showAlert: nextProps.showAlert
            })
        }
    }

    dismissAlert(){
        this.toggle();

        if(this.props.onCloseCallback && (this.props.message === SUCCESSFULL_SIGNUP || this.props.message === SUCCESSFULL_LOGIN) ){
            this.props.onCloseCallback();
        }
    }

    dismissAlertShowProfile(){
        this.toggle();

        if(this.props.onCloseCallback){
            this.props.onCloseCallback('profile');
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.state.showAlert}
                toggle={this.toggle}
                className='Login__Modal'
            >
                <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody>
                    <label style={{width: '100%'}}>{this.props.message}</label>
                    <Button
                        style={{marginLeft: this.props.message === SUCCESSFULL_LOGIN ? '' : '30%'}} 
                        onClick={this.dismissAlert}>
                            OK
                    </Button>
                    <Button 
                        style={{visibility: this.props.message === SUCCESSFULL_LOGIN ? 'visible' : 'hidden'}} 
                        onClick={this.dismissAlertShowProfile}>
                            Profile
                    </Button>
                </ModalBody>
            </Modal>
        );
    }
}
