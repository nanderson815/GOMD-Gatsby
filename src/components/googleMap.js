import React, { useEffect } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"
import { Card } from 'semantic-ui-react';
import Img from 'gatsby-image'
import { navigate } from 'gatsby'
import mapIcon from '../images/mapIcon.svg'


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



const HappyHourMap = ({ happyHours, hovered }) => {
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
                        icon={mapIcon}
                        labelVisible={visible === m.id || hovered === m.id}
                        onMouseOver={onMarkerHover.bind(this, m.id)}
                        onMouseOut={clearVisible}
                        onClick={onClickHandler.bind(this, m.slug, m.id)}
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
    }, [happyHours, visible, hovered])


    return (
        // Important! Always set the container height explicitly as less than 100vh to avoid strange sticky behavior.
        <GoogleMap
            options={{
                styles: mapStyles
            }}
            defaultZoom={zoom}
            defaultCenter={center}
        >
            <MarkerClusterer
                onClick={onMarkerClustererClick}
                averageCenter
                enableRetinaIcons
                gridSize={30}
            // defaultMaxZoom={13}
            >
                {markers}
            </MarkerClusterer>
        </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(HappyHourMap));