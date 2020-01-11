import React from "react"
import "semantic-ui-less/semantic.less"
import GoogleMap from '../components/googleMap'
import { Card } from "semantic-ui-react"
import { Link } from 'gatsby'
import Img from 'gatsby-image'


import './layout.css'

const MobileHappyHourMap = ({ filteredHH, hovered }) => {
    let length = filteredHH.length * 305
    console.log(length);
    return (
        <>
            <GoogleMap
                happyHours={filteredHH}
                hovered={hovered}
                isMarkerShown
                loadingElement={<div style={{ height: `100vh`, width: "100%" }} />}
                containerElement={<div style={{ height: `calc(104vh - 115.67px)`, marginTop: "-40px" }} />}
                mapElement={<div style={{ height: `100%` }} />}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}>
            </GoogleMap>

            <div className="scrolling-snapper" style={{ position: "absolute", bottom: "20px", left: "10px", width: "100%" }}>
                <Card.Group style={{ width: length }}>
                    {filteredHH.map(card => {
                        return (
                            <Card className="child-snap" key={card.id}>
                                <Link to={`/atlanta-happy-hour/${card.slug}`}>
                                    <Img style={{ height: "100px" }} alt={card.name + ' Happy Hour atlanta'} fluid={card.mainImg.fluid} />
                                </Link>
                                <Card.Content>
                                    <Card.Header>{card.name}</Card.Header>
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
            </div>
        </>
    )
}

export default MobileHappyHourMap;