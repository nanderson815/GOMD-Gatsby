import React, { useEffect, useState } from "react"
import "semantic-ui-less/semantic.less"
import GoogleMapMobile from '../components/googleMapForMobile'
import { Card, Modal, Image, Button, Icon } from "semantic-ui-react"
import { navigate } from 'gatsby'
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



const MobileHappyHourMap = ({ filteredHH, hovered, day }) => {

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

    const [previewHH, setPreviewHH] = React.useState('')
    const [modalOpen, setModalOpen] = React.useState(false)
    const handleClick = (card) => {
        console.log(card)
        setPreviewHH(card)
        setModalOpen(true)
    }

    const navClick = (slug) => {
        navigate("/atlanta-happy-hour/" + slug)
    }


    let width = filteredHH.length * 329 + 30
    let height = window ? window.innerHeight - 120 : '80vh'

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
                        day === "all" ? descriptionString = "" : descriptionString = card[descField][descField]
                        let trimmedString = descriptionString.length > 150 ? descriptionString.substring(0, 150 - 3) + "..." : descriptionString;
                        return (
                            <Card
                                style={{ marginLeft: `${index === 0 ? "20px" : null}`, width: "315px" }}
                                className="child-snap"
                                key={card.id}
                                id={card.id}
                                onClick={handleClick.bind(this, card)}
                                link={false}
                            >
                                <Img style={{ height: "80px" }} alt={card.name + ' Happy Hour atlanta'} fluid={card.mainImg.fluid} />
                                <Card.Content>
                                    <Card.Header style={{ margin: "-10px 0px -5px ", whiteSpace: "nowrap", overflow: "scroll" }}>{card.name}</Card.Header>
                                    <Card.Description style={{ marginBottom: "-10px" }}>{day === "all" ? card.neighborhood : setHHTime(card, day)} {trimmedString}</Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
            </div>
            <Modal
                open={modalOpen}
                closeOnDimmerClick={true}
                closeOnDocumentClick={true}
                onClose={() => setModalOpen(false)}
                closeIcon
            >
                {previewHH ?
                    <>
                        <Modal.Header>{previewHH.name}</Modal.Header>
                        <Modal.Content scrolling image>
                            <Image rounded style={{ marginBottom: "-20px" }} wrapped src={previewHH.mainImg.fluid.src}></Image>
                            <Modal.Description style={{ padding: "0px !important" }}>
                                <h3 style={{ marginTop: '-40px' }}>Happy Hours</h3>
                                <div>
                                    {previewHH.days.map((day, index) => {
                                        let descField = day.toLowerCase() + "Desc"
                                        let timeField = day.toLowerCase()
                                        return (
                                            <div key={`${index}happyHour`}>
                                                <h4 style={{ marginBottom: "-3px" }}> <u>{day}</u></h4>
                                                <p style={{ fontSize: "14px" }}>{setHHTime(previewHH, timeField)} {`${previewHH[descField][descField]}`}</p>
                                                <hr></hr>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button primary onClick={() => navClick(previewHH.slug)}>
                                More <Icon name='right chevron' />
                            </Button>
                        </Modal.Actions>
                    </>
                    : null}
            </Modal>
        </div >
    )
}

export default MobileHappyHourMap;