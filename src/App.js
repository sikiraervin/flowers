import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import React, { Component } from 'react';
import { NavigationMenu } from './components/NavigationMenu';
import { SearchBox } from './components/SearchBox';
import { FlowerListing } from './containers/FlowerListing';

class App extends Component { 

    render() {
        return (
            <div className="App">
                <NavigationMenu />
                <SearchBox />
                <FlowerListing />
            </div>
        );
    }
}

export default App;
