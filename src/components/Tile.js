import React from 'react';
import staricon from '../images/pl-icon-star.svg';

export class Tile extends React.Component {
    render() {
        return (
            <div
                className="Tile"

                style={{
                    backgroundImage: 'url(' + this.props.data.profile_picture + ')'
                }}>

                <div className='Fav__Button'>
                    <img
                        className="Star__Icon"
                        src={staricon}
                        alt='fav'
                    />
                </div>

                <label className='Tile__Name'>{this.props.data.name}</label>
                <label className='Tile__Name__Latin'>{this.props.data.latin_name}</label>
                <label className='Sightings__Label'>{this.props.data.sightings} sightings</label>
            </div>
        );
    }
}
