

import React from 'react';
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'mdbreact';

import "react-datepicker/dist/react-datepicker.css";
import client from '../client';
import { SUCCESSFULL_SIGNUP } from '../constants'
import { connect } from 'react-redux';
import { AlertDialog } from './AlertDialog';
import userImage from '../images/profile.jpg';

const mapStateToProps = state => state

class SignupModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showUserProfile: false,
            profile: {}
        };

        this.logout = this.logout.bind(this);
    }

    toggle = () => {
        this.setState({
            showUserProfile: !this.state.showUserProfile
        });
        
        this.props.onClose && this.props.onClose(null, false);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.profile, showUserProfile: nextProps.showUserProfile});
    }

    logout() {

    }

    render() {
        return (
            <Container>
                <Modal
                    className='Signup__Modal'
                    style={{ padding: '30px!important' }}
                    isOpen={this.state.showUserProfile}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody className='User__Profile__Body'>
                        <img
                            className="User__Profile__Image"
                            src={userImage}
                            alt='fav'
                        />  
                        <label className='User__Profile__Main__Label'>{this.state.firstName} {this.state.lastName}</label>
                        <label className='User__Profile__Sightings__Label'>{this.state.sightings} sightings</label>
                        <label className='User__Profile__Label'>First Name</label>
                        <label className='User__Profile__Label Large__Font'>{this.state.firstName}</label>
                        <label className='User__Profile__Label'>Last Name</label>
                        <label className='User__Profile__Label Large__Font'>{this.state.lastName}</label>
                        <label className='User__Profile__Label'>Date Of Birth</label>
                        <label className='User__Profile__Label Large__Font'>{this.state.dateOfBirth}</label>
                        <label className='User__Profile__Label'>Email</label>
                        <label className='User__Profile__Label Large__Font'>{this.state.email}</label>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={this.logout}>
                            Logout
                        </Button>
                        <AlertDialog
                            showAlert={this.state.showAlert}
                            ref='alert'
                            message={SUCCESSFULL_SIGNUP}>
                        </AlertDialog>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default connect(mapStateToProps, null)(SignupModal)
