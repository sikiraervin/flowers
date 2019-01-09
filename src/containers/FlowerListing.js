import React from 'react';
import { Tiles } from '../components/Tiles';
import { API_TOKEN } from '../constants';

const data = [{
	id: 1,
	name: "Island",
	image: "https://images.unsplash.com/photo-1442530792250-81629236fe54?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=9631adb2d2f752e3a0734f393fef634b"
}, {
	id: 2,
	name: "Forest",
	image: "https://images.unsplash.com/photo-1468851508491-4f854ec88aa0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=b1222b6a1d3694cac76d2a23c3a02254"
}, {
	id: 3,
	name: "Whale",
	image: "https://images.unsplash.com/photo-1454991727061-be514eae86f7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=3c55430f01fe9ac9a9ccb3383d1416ff"
}, {
	id: 4,
	name: "Mountain",
	image: "https://images.unsplash.com/photo-1467890947394-8171244e5410?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=9396f0adf263b51b44626228225684d0"
}, {
	id: 5,
	name: "Boat",
	image: "https://images.unsplash.com/photo-1443302382600-0bfacc473376?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=0c0f26518c1001f67b6c2e4480a8d3e0"
}, {
	id: 6,
	name: "Flowers",
	image: "https://images.unsplash.com/photo-1429091443922-e7d9ae79a837?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=e81cb6a60c53788559edb9bec21b80fc"
}, {
	id: 7,
	name: "Fire",
	image: "https://images.unsplash.com/photo-1468245856972-a0333f3f8293?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=1f57cc13084e32839627453821a43abf"
}, {
	id: 8,
	name: "Garden",
	image: "https://images.unsplash.com/photo-1427392797425-39090deb14ec?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=8bfe49466d0da200e61128a8ab0e8fbe"
}];

export class FlowerListing extends React.Component{
    state = {
        flowers: []
    };

    componentDidMount(){
        // Data is usually retrieved in a Lifecycle Method componentDidMount. 
        // https://www.andreasreiterer.at/connect-react-app-rest-api/

        fetch('https://flowrspot-api.herokuapp.com/api/v1/flowers', {
            method: 'get',
            headers: {
                authentication: API_TOKEN
            }
        })
        .then(response => {
            return response.json();
        })
        .then(rawData => {
            //For debug purposes
            console.log(rawData);

            this.setState({
                flowers: rawData.flowers
            });
        });
    }

    render(){
        return (
            <div>
               <Tiles data={this.state.flowers} />
            </div>
        );
    }
}
