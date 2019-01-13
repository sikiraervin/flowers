import React from 'react';
import { Col, Fa } from "mdbreact";

export class SearchBox extends React.Component {
    render() {
        return (
            <div className='ui three column centered grid Search__Section'>
                <div className='column centered'>
                    <div className='Main__Label'>Discover flowers around you</div>
                    <div className='Secondary__Label'>Explore between more than ++ 8371213 ++ sightings</div>
                    <div className='Search__Input'>
                        <Col md="5">
                            <form className="form-inline mt-4 mb-4">
                                <input
                                    className="form-control form-control-sm ml-3 w-75"
                                    type="text"
                                    placeholder="Looking for something specific?"
                                    aria-label="Search"
                                />
                                <Fa icon="search" className='Search__Icon' />
                            </form>
                        </Col>
                    </div>
                </div>
            </div>
        );
    }
}