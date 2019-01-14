import React from 'react';

import {
    Modal,
    ModalBody,
    ModalHeader
} from 'mdbreact';

export class AlertDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: this.props.showAlert,
            message: this.props.message
        }
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
    render() {
        return (
            <Modal
                isOpen={this.state.showAlert}
                toggle={this.toggle}
                className='Login__Modal'
            >
                <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody>
                    <label>{this.props.message}</label>
                </ModalBody>
            </Modal>
        );
    }
}
