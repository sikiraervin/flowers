import React from 'react';
import { Tiles } from '../components/Tiles';
import client from '../client';

export class FlowerListing extends React.Component {
    state = {
        flowers: []
    };

    componentDidMount() {
        //TODO: Handle the case to show a friendly user message on the Home screen if this API call fails
        client.getFlowers()
            .then((data) => {
                console.log(data)
                this.setState({
                    flowers: data.flowers
                })
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
