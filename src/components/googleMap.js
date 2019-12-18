import React, { Component, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';

const Marker = ({ info }) => <Icon size="huge" name="map marker alternate" style={{ color: "#1c70b5" }} />;




const SimpleMap = ({ happyHours }) => {
    const center = { lat: 33.78454, lng: -84.3880 }
    const zoom = 11
    const [markers, setMarkers] = React.useState([]);

    useEffect(() => {
        if (happyHours.length > 0) {
            console.log(happyHours)
            let points = happyHours.map((m, i) => {
                return (
                    <Marker
                        key={i}
                        lat={m.location.lat}
                        lng={m.location.lon}
                    />
                )
            });
            setMarkers(points);
        }
    }, [happyHours])


    return (
        // Important! Always set the container height explicitly as less than 100vh to avoid strange sticky behavior.
        <div style={{ height: '99.99vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyC-3IzXoP2LU2QhnrfuhZWHp_QGedI7VdY" }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {markers}
            </GoogleMapReact>
        </div>
    );
}

export default SimpleMap;