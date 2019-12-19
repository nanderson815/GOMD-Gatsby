import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import Img from 'gatsby-image'
import { navigate } from 'gatsby'

// Format time helper
const formatTime = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;

    return `${hours}:${minutes}${period}`;
}

const navfunc = (e, { slug }) => {
    navigate("/atlanta-happy-hour/" + slug)
}


const HHFinderCardGroup = ({ happyHours, day, rows, hood, setHoverHandler, clearHoveredHandler }) => {




    return (
        <Card.Group itemsPerRow={rows} style={{ marginTop: "10px" }}>
            {
                happyHours.map(deal => {
                    let timeField = day.toLowerCase();
                    let descField = day.toLowerCase() + "Desc";
                    let descriptionString;
                    day === "All" ? descriptionString = "" : descriptionString = deal[descField][descField]
                    let trimmedString = descriptionString.length > 200 ? descriptionString.substring(0, 200 - 3) + "..." : descriptionString;

                    return (
                        <Card
                            onMouseEnter={setHoverHandler.bind(this, deal.id)}
                            onMouseLeave={clearHoveredHandler}
                            link
                            onClick={navfunc}
                            key={deal.id}
                            slug={deal.slug} >
                            <Img style={{ height: "150px" }} alt={deal.name} fluid={deal.mainImg.fluid} />
                            <Card.Content>
                                <Card.Header>{deal.name}</Card.Header>
                                {day === "All" ? null :
                                    <Card.Description>
                                        <strong>{` ${formatTime(deal.hours[timeField].start)} - ${formatTime(deal.hours[timeField].end)}:`} </strong> {trimmedString}
                                    </Card.Description>}
                            </Card.Content>
                            <Card.Content extra value={deal.neighborhood}>
                                <Icon name="marker" />
                                {deal.neighborhood}
                            </Card.Content>
                        </Card>
                    )
                })
            }
        </Card.Group >
    )
}

export default HHFinderCardGroup;

