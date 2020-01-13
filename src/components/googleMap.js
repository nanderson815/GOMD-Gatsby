import React, { useEffect } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"
import { Card } from 'semantic-ui-react';
import Img from 'gatsby-image'
import { navigate } from 'gatsby'
import mapIcon from '../images/mapIcon2.svg'
import focusIcon from '../images/mapIcon3.svg'


const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const mapStyles = [
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
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
    disableDefaultUI: true
}



const HappyHourMap = ({ happyHours, hovered, focused }) => {
    const center = { lat: 33.78454, lng: -84.3880 }
    const zoom = 11
    const [markers, setMarkers] = React.useState([]);

    const onMarkerClustererClick = (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers()
    }

    const [visible, setVisible] = React.useState("")
    const onMarkerHover = (id) => {
        setVisible(id)
    }
    const clearVisible = () => {
        setVisible("")
    }

    const onClickHandler = (slug, id) => {
        console.log(id)
        if (visible === id) {
            navigate("/atlanta-happy-hour/" + slug)
        } else {
            setVisible(id)
        }
    }


    useEffect(() => {
        if (happyHours.length > 0) {
            let points = happyHours.map((m) => {
                return (
                    <MarkerWithLabel
                        key={m.id}
                        position={{ lat: m.location.lat, lng: m.location.lon }}
                        lable={m.location.name}
                        labelAnchor={{ x: (200 / 2), y: 195 }}
                        labelStyle={{ fontSize: "12px", padding: "5px" }}
                        icon={focused === m.id ? focusIcon : mapIcon}
                        labelVisible={visible === m.id || hovered === m.id}
                        onMouseOver={onMarkerHover.bind(this, m.id)}
                        onMouseOut={clearVisible}
                        onClick={onClickHandler.bind(this, m.slug, m.id)}
                        zIndex={focused === m.id ? 10000 : 100}
                    >
                        <Card style={{ width: "200px" }}>
                            <Img style={{ height: "100px" }} alt={m.name} fluid={m.mainImg.fluid} />
                            <Card.Content>
                                <Card.Header>
                                    {m.name}
                                </Card.Header>
                            </Card.Content>
                        </Card>
                    </MarkerWithLabel>
                )
            });
            setMarkers(points);
        } else {
            setMarkers([]);
        }
    }, [happyHours, visible, hovered, focused])


    return (
        // Important! Always set the container height explicitly as less than 100vh to avoid strange sticky behavior.
        <GoogleMap
            options={{
                styles: mapStyles
            }}
            defaultZoom={zoom}
            defaultCenter={center}
            defaultOptions={defaultMapOptions}
        >
            {/* <MarkerClusterer
                onClick={onMarkerClustererClick}
                averageCenter
                enableRetinaIcons
                gridSize={20}
            // defaultMaxZoom={13}
            > */}
            {markers}
            {/* </MarkerClusterer> */}
        </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(HappyHourMap));