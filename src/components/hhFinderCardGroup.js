import React, { useEffect } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import Img from 'gatsby-image'
import { navigate, Link } from 'gatsby'
import { setHHTime } from '../Util/Util'

const navfunc = (e, { slug }) => {
    navigate("/atlanta-happy-hour/" + slug)
}


const HHFinderCardGroup = ({ happyHours, day, rows, hood, setHoverHandler, clearHoveredHandler }) => {

    const [cards, setCards] = React.useState('')

    useEffect(() => {

        let cards = happyHours.map(deal => {
            let timeField = day.toLowerCase();
            let descField = day.toLowerCase() + "Desc";
            let descriptionString;
            day === "All" ? descriptionString = "" : descriptionString = deal[descField][descField]
            let trimmedString = descriptionString.length > 200 ? descriptionString.substring(0, 200 - 3) + "..." : descriptionString;

            return (
                <Card
                    // onMouseEnter={setHoverHandler.bind(this, deal.id)}
                    // onMouseLeave={clearHoveredHandler}
                    link
                    // onClick={navfunc}
                    key={deal.id}
                    slug={deal.slug} >
                    <Link to={`/atlanta-happy-hour/${deal.slug}`}>
                        <Img style={{ height: "150px" }} alt={deal.name + ' Happy Hour atlanta'} fluid={deal.mainImg.fluid} />
                    </Link>
                    <Card.Content>
                        <Card.Header style={{ marginBottom: '5px' }}> <Link style={{ color: "black" }} to={`/atlanta-happy-hour/${deal.slug}`}>{deal.name}</Link></Card.Header>
                        <Link style={{ color: "grey" }} to={`/atlanta-happy-hour/${deal.slug}`}>
                            {day === "All" ? null :
                                <Card.Description>
                                    {setHHTime(deal, timeField)} {trimmedString}
                                </Card.Description>}
                        </Link>
                    </Card.Content>
                    <Card.Content extra value={deal.neighborhood}>
                        <Icon name="marker" />
                        {deal.neighborhood}
                    </Card.Content>
                </Card>
            )
        })
        setCards(cards);
    }, [happyHours])



    return (
        <Card.Group itemsPerRow={rows} style={{ marginTop: "20px" }}>
            {cards}
        </Card.Group >
    )
}

export default HHFinderCardGroup;

