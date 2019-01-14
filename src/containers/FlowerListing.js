import React from 'react';
import { Tiles } from '../components/Tiles';
import client from '../client';
import { connect } from 'react-redux';
import FlowerActions from '../actions/FlowerActions';
import { PUBLIC_API_TOKEN } from '../constants';

const mapStateToProps = state => state

class FlowerListing extends React.Component {
    state = {
        flowers: []
    };

    loadFlowers() {
        //Injected into props by 'connect()' call
        let { dispatch, flowers } = this.props;

        if (flowers) {
            // We could also load cached data instead of making an API call
            // Two use cases:
            // 1. Implement a timeout, to fetch new data after some time has passed
            //    and not to request the API each time the user lands on the Home screen
            // 2. A request to fetch new data fails and we display the previous cached data set    
            return;
        }

        // We could also log that this call was made with a specific userId,
        // or some other identifier if its needed 
        dispatch(FlowerActions.loadFlowersRequest(PUBLIC_API_TOKEN));

        //TODO: Handle the case to show a friendly user message on the Home screen if this API call fails
        client.getFlowers().then(
            response => dispatch(FlowerActions.loadFlowersSuccess(PUBLIC_API_TOKEN, response)),
            error => dispatch(FlowerActions.loadFlowersFailure(PUBLIC_API_TOKEN, error))
        )
    }

    componentDidMount() {
        this.loadFlowers();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            flowers: nextProps.FlowersReducer.flowers
        })
    }

    render() {
        return (
            <div>
                <Tiles data={this.state.flowers} />
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(FlowerListing)
