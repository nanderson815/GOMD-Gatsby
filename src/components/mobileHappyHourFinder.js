import React from "react"
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import Img from 'gatsby-image';
import { Grid, Sticky, Card } from "semantic-ui-react"

const MobileHappyHourFinder = ({ happyhours }) => {

    return (
        <>
            <SEO title="Atlanta Happy Hour Finder" />
            <Grid style={{ margin: "0px" }}>
                <Grid.Column width={16} style={{ background: "white" }}>
                    <Sticky>
                        <Link to="/"><h1 style={{ padding: "0px 0px 10px 10px", marginBottom: "0px", color: "#1c70b5" }}>Georgia on my Dime</h1></Link>
                        <div style={{ height: "4px", background: "#1c70b5", margin: "0px -14px 10px -14px" }}></div>
                    </Sticky>
                    <Card.Group>
                        {happyhours.map(deal => {
                            return (<Card fluid key={deal.id}>
                                <Img style={{ height: "150px" }} alt={deal.name} fluid={deal.mainImg.fluid} />
                                <Card.Content>
                                    <Card.Header>{deal.name}</Card.Header>


                                </Card.Content>
                            </Card>)
                        })}
                    </Card.Group>

                </Grid.Column>
            </Grid>
        </>
    )
}

export default MobileHappyHourFinder;