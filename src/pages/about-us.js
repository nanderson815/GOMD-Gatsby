import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Card, Icon, Segment, Grid } from 'semantic-ui-react'
import Header from '../components/header/header'
import SEO from '../components/seo'
import Layout from '../components/layout'

const About = ({ data }) => (
  <div>
    <SEO title='About Us' />
    <Header />
    <Layout>
      <h1>About Us</h1>
      <Card.Group stackable itemsPerRow={4}>
        <Card link>
          <Card.Content textAlign='center'>
            <Icon style={{ marginBottom: '15px' }} name='building' size='big' inverted circular color='grey' />
            <Card.Header>LOCAL</Card.Header>
            <Card.Description>
              By Atlantans, for Atlantans. We love sharing the things that make our city so unique.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card link>
          <Card.Content textAlign='center'>
            <Icon style={{ marginBottom: '15px' }} name='dollar' size='big' inverted circular color='grey' />
            <Card.Header>FRUGAL</Card.Header>
            <Card.Description>
              Our list of Happy Hours and deals in Atlanta ensures that you can have a blast - without breaking the
              bank.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card link>
          <Card.Content textAlign='center'>
            <Icon style={{ marginBottom: '15px' }} name='thumbs up' size='big' inverted circular color='grey' />
            <Card.Header>POSITIVE</Card.Header>
            <Card.Description>
              We showcase the best Atlanta has to offer. If we don't have something positive to say, we won't say it at
              all.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card link>
          <Card.Content textAlign='center'>
            <Icon style={{ marginBottom: '15px' }} name='arrow up' size='big' inverted circular color='grey' />
            <Card.Header>PROACTIVE</Card.Header>
            <Card.Description>
              Our list of deals and Happy Hours is always growing. Check it out today!
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
      <Segment>
        <h3>About Us</h3>
        <Grid stackable columns={2}>
          <Grid.Column>
            <p>
              Georgia on my Dime is Atlanta’s number one site for up-to-date happy hour specials, upcoming events, and
              local guides. Whether you’re an Atlanta native or new to the city, you’ll be sure to discover great deals
              and local events!
            </p>
            <p>
              We work hard to ensure all of our information is current and accurate. If you notice an error,{' '}
              <Link to='/contact'>Please Contact Us</Link>, and we will correct it as soon as possible.
            </p>
            <p>
              If you are a local business owner and would like to promote your event or restaurant,{' '}
              <Link to='/contact'>Please Contact Us</Link> and we will get back to you promptly.
            </p>
            <p>
              Cheers!
              <br />
              <em>
                <strong>Georgia on my Dime</strong>
              </em>
            </p>
          </Grid.Column>
          <Grid.Column>
            <Img fluid={data.file.childImageSharp.fluid} />
          </Grid.Column>
        </Grid>
      </Segment>
    </Layout>
  </div>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "Bazati.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`

export default About
