import React, { useEffect, useState } from "react"
import "semantic-ui-less/semantic.less"
import GoogleMap from '../components/googleMap'
import { Card, Icon } from "semantic-ui-react"
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import './layout.css'


const MobileHappyHourMap = ({ filteredHH, hovered }) => {

    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleFocused(entry.target.id)
            }
        })
    }

    const createObserver = (elements) => {
        let observer;
        let options = {
            root: document.getElementById("scrollArea"),
            rootMargin: "0px",
            threshold: 1.0
        };
        observer = new IntersectionObserver(handleIntersect, options);
        elements.forEach(element => observer.observe(element))
    }

    const [focused, setFocused] = useState('')

    const handleFocused = (id) => {
        if (focused !== id) {
            setFocused(id)
        } else {
        }
    }

    useEffect(() => {
        let elements = []
        filteredHH.forEach(card => elements.push(document.getElementById(`${card.id}`)))
        createObserver(elements);
    }, [filteredHH])


    let width = filteredHH.length * 304 + 30
    return (
        <>
            <GoogleMap
                happyHours={filteredHH}
                hovered={hovered}
                focused={focused}
                isMarkerShown
                loadingElement={<div style={{ height: `100vh`, width: "100%" }} />}
                containerElement={<div style={{ height: `calc(104vh - 115.67px)`, marginTop: "-40px" }} />}
                mapElement={<div style={{ height: `100%` }} />}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}>
            </GoogleMap>

            <div id="scrollArea" className="scrolling-snapper" style={{ position: "absolute", bottom: "20px", width: "calc(100vw)" }}>
                <Card.Group style={{ width: width }}>
                    {filteredHH.map((card, index) => {
                        return (
                            <Card
                                style={{ marginLeft: `${index === 0 ? "20px" : null}` }}
                                className="child-snap"
                                key={card.id}
                                id={card.id}>
                                <Img style={{ height: "80px" }} alt={card.name + ' Happy Hour atlanta'} fluid={card.mainImg.fluid} />
                                <Card.Content>
                                    <Card.Header style={{ marginBottom: "-15px" }}>{card.name}</Card.Header>
                                </Card.Content>
                                <Card.Content style={{ padding: "3px 0px 0px 5px", marginBottom: "-5px" }}>
                                    <Link to={`/atlanta-happy-hour/${card.slug}`}>
                                        <Card.Description style={{ color: "grey" }}>Show Happy Hours <Icon style={{ float: "right" }} name="chevron right"></Icon> </Card.Description>
                                    </Link>
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