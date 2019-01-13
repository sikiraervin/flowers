import React from 'react';
import { Tile } from './Tile';

export class Tiles extends React.Component {
    render() {
        return (
            <div className="Tiles">
                {this.props.data.map((data, index) => {
                    return <Tile data={data} key={data.id} />
                })}
            </div>
        );
    }
}
