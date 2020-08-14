import React, { useEffect } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { Card } from 'semantic-ui-react';
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import mapIcon from '../images/mapIcon2.svg'


const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const mapStyles = [
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
    },
    {
        "featureType": "administrative.locality",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]

const defaultMapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: mapStyles
}

const HappyHourMap = ({ happyHours, hovered }) => {
    const center = { lat: 33.78454, lng: -84.3880 }
    const zoom = 11
    const [markers, setMarkers] = React.useState([]);

    const [visible, setVisible] = React.useState("")

    // const onMarkerHover = (id) => {
    //     setVisible(id)
    //     let element = document.getElementById(id);
    //     element.scrollIntoView({ block: 'center' })
    // }
    const clearVisible = () => {
        setVisible("")
    }

    const onClickHandler = (id) => {
        let element = document.getElementById(id);
        element.scrollIntoView({ block: 'center' })
        setVisible(id)
    }


    useEffect(() => {
        if (happyHours.length > 0) {
            let points = happyHours.map((m) => {
                return (
                    <Marker
                        key={m.id}
                        position={{ lat: m.location.lat, lng: m.location.lon }}
                        lable={m.location.name}
                        labelAnchor={{ x: (200 / 2), y: 180 }}
                        labelStyle={{ fontSize: "12px", padding: "5px" }}
                        icon={mapIcon}
                        labelVisible={visible === m.id || hovered === m.id}
                        // onMouseOver={onMarkerHover.bind(this, m.id)}
                        // onMouseOut={clearVisible}
                        onClick={onClickHandler.bind(this, m.id)}
                    >
                        {visible === m.id && <InfoWindow style={{ padding: "0px" }} onCloseClick={onClickHandler.bind(this, m.id)}>
                            <Card style={{ width: "200px", }}>
                                <Img style={{ height: "100px" }} alt={m.name} fluid={m.mainImg.fluid} />
                                <Card.Content>
                                    <Card.Header>
                                        <Link style={{ color: "black" }} to={`/atlanta-happy-hour/${m.slug}`}> {m.name}</Link>
                                    </Card.Header>
                                </Card.Content>
                            </Card>
                        </InfoWindow>}
                    </Marker>
                )
            });
            setMarkers(points);
        } else {
            setMarkers([]);
        }
    }, [happyHours, visible, hovered])


    return (
        // Important! Always set the container height explicitly as less than 100vh to avoid strange sticky behavior.
        <GoogleMap
            defaultZoom={zoom}
            defaultCenter={center}
            options={defaultMapOptions}
            onClick={clearVisible}
        >
            <MarkerClusterer
                averageCenter
                enableRetinaIcons
                gridSize={25}
            // defaultMaxZoom={13}
            >
                {markers}
            </MarkerClusterer>
        </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(HappyHourMap));