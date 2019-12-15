import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';

const AnyReactComponent = ({ info }) => <Icon size="huge" name="map marker alternate" style={{ color: "#1c70b5" }} />;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 33.7490,
            lng: -84.3880
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyC-3IzXoP2LU2QhnrfuhZWHp_QGedI7VdY" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={33.7490}
                        lng={-84.3880}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;