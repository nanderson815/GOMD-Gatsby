import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
// import AdSense from 'react-adsense'
import { Grid, Label, Segment, Container, Divider, Icon, Responsive, Sticky } from 'semantic-ui-react'
import Header from '../../components/header/header'
import SEO from '../../components/seo'
import Layout from '../../components/layout'
import BottomlessMap from '../../components/bottomlessMimosaMap'

const BestAtlantaHappyHours = ({ data }) => {
  const bestData = data.allContentfulHappyHour.edges.map(item => item.node)
  const [center, setCenter] = React.useState('')

  const bestHappyHours = bestData.map(deal => (
    <div data-lat={deal.location.lat} data-lon={deal.location.lon} id={deal.id} key={deal.id}>
      <Img
        alt={`${deal.name} best happy hour atlanta`}
        title={`${deal.name} best happy hour atlanta`}
        fluid={deal.mainImg.fluid}
        style={{ width: '100%', maxHeight: '400px', borderRadius: '5px' }}
      />
      <Link style={{ color: '#1c70b5' }} to={`/atlanta-happy-hour/${deal.slug}`}>
        {' '}
        <h1>{deal.name}</h1>
      </Link>
      <p style={{ fontSize: '13px' }}>
        <Icon name='map marker alternate' />
        {deal.address}
      </p>
      <p>{deal.description.description}</p>
      <Divider />
    </div>
  ))

  const handleIntersect = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setCenter({ lat: entry.target.getAttribute('data-lat'), lng: entry.target.getAttribute('data-lon') })
      }
    })
  }

  const createObserver = elements => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    }
    const observer = new IntersectionObserver(handleIntersect, options)
    elements.forEach(element => observer.observe(element))
  }

  useEffect(() => {
    const elements = []
    bestHappyHours.forEach(card => elements.push(document.getElementById(`${card.key}`)))
    createObserver(elements)
  }, [])

  useEffect(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }, [])

  return (
    <div>
      <SEO
        title='The Best Happy Hours in Atlanta (2020)'
        image='/atlanta-happy-hour-georgia-on-my-dime.jpeg'
        description='Here are the Best Atlanta Happy Hours to grab discounted drinks, apps, and much more! Find your favorite Atlanta Happy Hour, your friends will thank you.'
      />
      <Header />
      <Segment style={{ marginTop: '-15px' }}>
        <Container>
          <Grid stackable>
            <Grid.Column computer={10}>
              <Label color='blue'>Guide</Label>
              <h1 style={{ fontSize: 'calc((.4em + 1.5vmin) + (.4em + 1.5vmax))', marginTop: '0px' }}>
                The Best Happy Hours in Atlanta
              </h1>
              <p>We track hundreds of happy hours, but these should top your list.</p>
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>
      <Layout>
        <Grid>
          <Grid.Column computer={10} tablet={10} mobile={16}>
            <p style={{ fontWeight: '400' }}>
              Our team has visited almost every restaurant in this great city as part of creating Georgia on my Dime. If
              there were even whispers of a happy hour at a restaurant from Sandy Springs to Inman Park, we showed up.
              Throughout this process we learned that not all happy hours are created equal. Don’t get me wrong – there
              is nothing bad about discounted drinks and apps no matter where you get them. But with that being said, we
              developed some clear favorites that have kept us coming back again and again. Check out the list of the
              best happy hours in Atlanta below, and be sure to pay a few a visit. We guarantee you won’t regret it.
            </p>
            <Divider />
            {bestHappyHours}
          </Grid.Column>
          <Sticky as={Grid.Column} offset={90} tablet={6} computer={6} mobile={16}>
            <Responsive minWidth={768}>
              <Segment style={{ padding: '0px' }}>
                <BottomlessMap
                  happyHours={bestData}
                  center={center}
                  isMarkerShown
                  loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
                  containerElement={<div style={{ height: `350px`, width: '100%' }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                />
              </Segment>
            </Responsive>
            <Segment raised style={{ paddingBottom: '1px' }}>
              {/* <AdSense.Google
                client='ca-pub-4839737207231731'
                slot='4063925755'
                responsive='true'
                format='auto'
                style={{ display: 'block', width: '100% !important' }}
              /> */}
              <p style={{ width: '100%', textAlign: 'center', fontSize: '12px' }}>
                <i>sponsored content</i>
              </p>
            </Segment>
          </Sticky>
        </Grid>
      </Layout>
    </div>
  )
}

export const query = graphql`
  query bestHH {
    allContentfulHappyHour(filter: { best: { eq: true } }) {
      edges {
        node {
          ...allHappyHourFields
        }
      }
    }
  }
`

export default BestAtlantaHappyHours
