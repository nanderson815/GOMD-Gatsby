import React from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const Favorites = ({ data, rows }) => {
    console.log(data)
    return (
        <div>
            {data === undefined || data.length === 0 ? <div style={{ textAlign: "center" }}><h3>Looks like you don't have any favorites yet.</h3> <Link to='/happy-hour-finder'><Button style={{ marginBottom: '20px' }} primary>Explore Happy Hours</Button></Link> </div> : null
            }
            <Card.Group itemsPerRow={rows}>
                {data.map(favorite => {
                    return (
                        <Card
                            link
                            key={favorite.id}
                            id={favorite.id}
                            slug={favorite.slug} >
                            <Link to={`/atlanta-happy-hour/${favorite.slug}`}>
                                <Img style={{ height: "150px" }} alt={favorite.name + ' Happy Hour atlanta'} fluid={favorite.mainImg.fluid} />
                            </Link>
                            <Card.Content>
                                <Card.Header style={{ marginBottom: '5px' }}> <Link style={{ color: "black" }} to={`/atlanta-happy-hour/${favorite.slug}`}>{favorite.name}</Link></Card.Header>
                                <Link style={{ color: "grey" }} to={`/atlanta-happy-hour/${favorite.slug}`}>
                                    {favorite.seoDescription}
                                </Link>
                            </Card.Content>
                            <Card.Content extra value={favorite.neighborhood}>
                                <Icon name="marker" />
                                {favorite.neighborhood}
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>

        </div>
    )
}

export default Favorites