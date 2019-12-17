import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';

const Marker = ({ info }) => <Icon size="huge" name="map marker alternate" style={{ color: "#1c70b5" }} />;

let locations = [
    { lat: 33.78575, lng: -84.3844 },
    { lat: 33.78575, lng: -84.4112 }
]

const markers = locations.map((m, i) => {
    return (
        <Marker
            key={i}
            lat={m.lat}
            lng={m.lng}
        />
    )
});


class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 33.78454,
            lng: -84.3880
        },
        zoom: 11
    };

    render() {

        console.log(this.props);

        return (
            // Important! Always set the container height explicitly as less than 100vh to avoid strange sticky behavior.
            <div style={{ height: '99.99vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyC-3IzXoP2LU2QhnrfuhZWHp_QGedI7VdY" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {markers}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;