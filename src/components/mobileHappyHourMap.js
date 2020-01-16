import React, { useEffect, useState } from "react"
import "semantic-ui-less/semantic.less"
import GoogleMapMobile from '../components/googleMapForMobile'
import { Card } from "semantic-ui-react"
import { navigate, Link } from 'gatsby'
import Img from 'gatsby-image'
import './layout.css'

// Format time helper
const formatTime = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;

    return `${hours}:${minutes}${period}`;
}

const setHHTime = (post, day) => {
    if (post.hours[day].end2 !== null) {
        return (
            <strong>{` ${formatTime(post.hours[day].start)} - ${formatTime(post.hours[day].end)} & ${formatTime(post.hours[day].start2)} - ${formatTime(post.hours[day].end2)}:`} </strong>
        )
    } else {
        return <strong>{` ${formatTime(post.hours[day].start)} - ${formatTime(post.hours[day].end)}:`} </strong>
    }
}

const navfunc = (e, { slug }) => {
    navigate("/atlanta-happy-hour/" + slug)
}

const MobileHappyHourMap = ({ filteredHH, hovered, day }) => {

    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleFocused(entry.target.id)
                console.log(entry.target.id)
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
            sessionStorage.setItem('id', id)
            setFocused(id)
        }
    }

    useEffect(() => {
        let id = sessionStorage.getItem('id')
        let element = document.getElementById(id)

        if (id !== focused && element) {
            element.scrollIntoView({ inline: 'center' })
        }
    })

    useEffect(() => {
        let elements = []
        filteredHH.forEach(card => elements.push(document.getElementById(`${card.id}`)))
        createObserver(elements);
    }, [filteredHH])


    let width = filteredHH.length * 314 + 30
    let height = window ? window.innerHeight - 151 : '80vh'
    // console.log(height)

    return (
        <div>
            <GoogleMapMobile
                happyHours={filteredHH}
                focused={focused}
                width={width}
                isMarkerShown
                loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
                containerElement={<div style={{ height: height }} />}
                mapElement={<div style={{ height: `100%` }} />}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}>
            </GoogleMapMobile >

            <div id="scrollArea" className="scrolling-snapper" style={{ position: "fixed", bottom: "10px", width: "calc(100vw)" }}>
                <Card.Group style={{ width: width }}>
                    {filteredHH.map((card, index) => {
                        let descField = day + "Desc";
                        let descriptionString;
                        day === "allDesc" ? descriptionString = "" : descriptionString = card[descField][descField]
                        let trimmedString = descriptionString.length > 150 ? descriptionString.substring(0, 150 - 3) + "..." : descriptionString;
                        return (
                            <Card
                                style={{ marginLeft: `${index === 0 ? "20px" : null}`, width: "300px" }}
                                className="child-snap"
                                key={card.id}
                                id={card.id}
                                onClick={navfunc}
                                slug={card.slug}
                            >
                                <Img style={{ height: "80px" }} alt={card.name + ' Happy Hour atlanta'} fluid={card.mainImg.fluid} />
                                <Card.Content>
                                    <Card.Header style={{ margin: "-10px 0px -5px ", whiteSpace: "nowrap", overflow: "scroll" }}>{card.name}</Card.Header>
                                    <Card.Description style={{ marginBottom: "-10px" }}>{setHHTime(card, day)} {trimmedString}</Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
            </div>
        </div >
    )
}

export default MobileHappyHourMap;