import React from 'react'
import Header from '../components/header'
import SEO from '../components/seo';
import Layout from '../components/layout';
import { Card, Icon } from 'semantic-ui-react';
const About = () => {
    return (
        <div>
            <SEO title="About Us"></SEO>
            <Header></Header>
            <Layout>
                <h1>About Us</h1>
                <Card.Group stackable itemsPerRow={4}>
                    <Card>
                        <Card.Content textAlign="center">
                            <Icon style={{ marginBottom: "15px" }} name="building" size="big" inverted circular color="grey"></Icon>
                            <Card.Header>Local</Card.Header>
                            <Card.Description>
                                By Atlantans, for Atlantans. We love sharing the things that make our city so unique.
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content textAlign="center">
                            <Icon style={{ marginBottom: "15px" }} name="dollar" size="big" inverted circular color="grey"></Icon>
                            <Card.Header>Frugal</Card.Header>
                            <Card.Description>
                                Our list of Happy Hours and deals in Atlanta ensures that you can have a blast - without breaking the bank.
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content textAlign="center">
                            <Icon style={{ marginBottom: "15px" }} name="thumbs up" size="big" inverted circular color="grey"></Icon>
                            <Card.Header>Positive</Card.Header>
                            <Card.Description>
                                We showcase the best Atlanta has to offer. If we don't have something positive to say, we won't say it at all.
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content textAlign="center">
                            <Icon style={{ marginBottom: "15px" }} name="arrow up" size="big" inverted circular color="grey"></Icon>
                            <Card.Header>Proactive</Card.Header>
                            <Card.Description>
                                Our list of deals and Happy Hours is always growing. Check it out today!
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Layout>
        </div >
    )
};

export default About;