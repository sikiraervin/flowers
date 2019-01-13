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
            show: this.props.show,
            message: this.props.message
        }
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        return (
            <Modal
                isOpen={this.state.show}
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
