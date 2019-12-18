import React, { useEffect } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"
import { Card } from 'semantic-ui-react';
import Img from 'gatsby-image'

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");





const HappyHourMap = ({ happyHours }) => {
    const center = { lat: 33.78454, lng: -84.3880 }
    const zoom = 11
    const [markers, setMarkers] = React.useState([]);

    const onMarkerClustererClick = (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers()
        console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        console.log(clickedMarkers)
    }

    const [visible, setVisible] = React.useState("")
    const onMarkerClick = (id) => {
        setVisible(id)
    }

    useEffect(() => {
        if (happyHours.length > 0) {
            console.log(happyHours)
            let points = happyHours.map((m, i) => {
                return (
                    <MarkerWithLabel
                        key={i}
                        position={{ lat: m.location.lat, lng: m.location.lon }}
                        lable={m.location.name}
                        labelAnchor={{ x: (200 / 2), y: 195 }}
                        labelStyle={{ fontSize: "12px", padding: "5px" }}
                        labelVisible={visible === m.id}
                        onClick={onMarkerClick.bind(this, m.id)}
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
        }
    }, [happyHours, visible])


    return (
        // Important! Always set the container height explicitly as less than 100vh to avoid strange sticky behavior.
        <GoogleMap
            defaultZoom={zoom}
            defaultCenter={center}
        >
            <MarkerClusterer
                onClick={onMarkerClustererClick}
                averageCenter
                enableRetinaIcons
                gridSize={60}
                defaultMaxZoom={13}
            >
                {markers}
            </MarkerClusterer>
        </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(HappyHourMap));