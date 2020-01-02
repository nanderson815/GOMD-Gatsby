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
                <Card.Group>
                    <Card>
                        <Card.Content textAlign="center">
                            <Icon style={{ marginBottom: "15px" }} name="building" size="big" inverted circular color="grey"></Icon>
                            <Card.Header>Local</Card.Header>
                            <Card.Description>
                                By Atlantans, for Atlantans. We love sharing the things that make our city so unique.
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Layout>
        </div >
    )
};

export default About;