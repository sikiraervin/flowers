import React from 'react';

class ExampleCustomInput extends React.Component {
    render() {
        return (
            <button
                className="example-custom-input"
                onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}

ExampleCustomInput.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
};

export default ExampleCustomInput
