import React from "react"
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import { Grid, Sticky, Card } from "semantic-ui-react"
import HHFinderCardGroup from './hhFinderCardGroup'

const MobileHappyHourFinder = ({ happyhours, day, hood }) => {

    return (
        <>
            <SEO title="Atlanta Happy Hour Finder" />
            <Grid style={{ margin: "0px" }}>
                <Grid.Column width={16}>
                    <Sticky>
                        <Link to="/"><h1 style={{ padding: "0px 0px 10px 10px", marginBottom: "0px", color: "#1c70b5" }}>Georgia on my Dime</h1></Link>
                        <div style={{ height: "4px", background: "#1c70b5", margin: "0px -14px 10px -14px" }}></div>
                    </Sticky>
                    <HHFinderCardGroup happyHours={happyhours} hood={hood} day={day} rows={1}></HHFinderCardGroup>

                </Grid.Column>
            </Grid>
        </>
    )
}

export default MobileHappyHourFinder;