import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import './App.css';

import React from 'react';
import { SearchBox } from './components/SearchBox';
import { FlowerListing } from './containers/FlowerListing';
import { NavigationMenu } from './components/NavigationMenu';

const App = () => ( 
    <div className='App'>
        <NavigationMenu />
        <SearchBox />
        <FlowerListing />
    </div>
)

export default App
