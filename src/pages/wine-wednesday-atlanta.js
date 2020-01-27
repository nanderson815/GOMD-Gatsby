import React, { useEffect } from 'react'
import Header from '../components/header'
import SEO from '../components/seo'
import Layout from '../components/layout'
import { Grid, Label, Segment, Container, Divider, Icon, Responsive, Sticky } from 'semantic-ui-react'
import Img from 'gatsby-image'
import BottomlessMap from '../components/bottomlessMimosaMap'
import { Link, graphql } from 'gatsby'
import AdSense from 'react-adsense';


const WineWednesdayAtlanta = (props) => {
    let wineData = props.data.allContentfulHappyHour.edges.map(item => item.node);
    const [center, setCenter] = React.useState('')

    let wineWednesdayHappyHours = wineData.map((deal) => {
        return (
            <div data-lat={deal.location.lat} data-lon={deal.location.lon} id={deal.id} key={deal.id}>
                <Img alt={`${deal.name} wine wednesday atlanta`} title={`${deal.name} wine wednesday atlanta`} fluid={deal.mainImg.fluid} style={{ width: "100%", maxHeight: "400px", borderRadius: "5px" }}></Img>
                <Link style={{ color: "#1c70b5" }} to={`/atlanta-happy-hour/${deal.slug}`}> <h1>{deal.name}</h1></Link>
                <p style={{ fontSize: "13px" }}><Icon name='map marker alternate'></Icon>{deal.address}</p>
                <p>{deal.wineWednesday.wineWednesday}</p>
                <Divider></Divider>
            </div>
        )
    })

    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setCenter({ lat: entry.target.getAttribute("data-lat"), lng: entry.target.getAttribute("data-lon") })
            }
        })
    }

    const createObserver = (elements) => {
        let observer;
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1
        };
        observer = new IntersectionObserver(handleIntersect, options);
        elements.forEach(element => observer.observe(element))
    }

    useEffect(() => {
        let elements = []
        wineWednesdayHappyHours.forEach(card => elements.push(document.getElementById(`${card.key}`)))
        createObserver(elements);
    }, [])

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, [])

    return (
        <div>
            <SEO
                title="Wine Wednesday in Atlanta (2020)"
                image='/wine-wednesday-in-atlanta.jpg'
                description="Here are the Best Wine Wednesday deals in Atlanta. You've made it halfway through the week - time to reward yourself!"></SEO>
            <Header></Header>
            <Segment style={{ marginTop: "-15px" }}>
                <Container>
                    <Grid stackable>
                        <Grid.Column computer={10}>
                            <Label color='blue'>Guide</Label>
                            <h1 style={{ fontSize: "calc((.4em + 1.5vmin) + (.4em + 1.5vmax))", marginTop: "0px" }}>Wine Wednesday in Atlanta</h1>
                            <p>The week is halfway over. Time to reward yourself.</p>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Segment>
            <Layout>
                <Grid >
                    <Grid.Column computer={10} tablet={10} mobile={16}>
                        <p style={{ fontWeight: '400' }}>There’s no reason to whine when you still have a couple more days of the work week – because guess what...It’s Wine Wednesday!
                        Whether you’re looking for a fun night out with the gals or just need a little solo pick-me-up, we’ve got you covered on Wednesdays.
                        Keep reading till the end – one of these spots offers Bottomless Wine on Wednesdays.
                        Some might think that’s aggressive, but honestly, we like their style! </p>
                        <Divider></Divider>
                        {wineWednesdayHappyHours}
                    </Grid.Column>
                    <Sticky as={Grid.Column} offset={90} tablet={6} computer={6} mobile={16}>
                        <Responsive minWidth={768}>
                            <Segment style={{ padding: '0px' }}>
                                <BottomlessMap
                                    happyHours={wineData}
                                    center={center}
                                    isMarkerShown
                                    loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
                                    containerElement={<div style={{ height: `350px`, width: "100%" }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}>
                                </BottomlessMap >
                            </Segment>
                        </Responsive>
                        <Segment raised style={{ paddingBottom: '1px' }}>
                            <AdSense.Google
                                client="ca-pub-4839737207231731"
                                slot='4063925755'
                                responsive='true'
                                format='auto'
                                style={{ display: 'block', width: "100% !important" }}
                            />
                            <p style={{ width: "100%", textAlign: 'center', fontSize: "12px" }}><i>sponsored content</i></p>
                        </Segment>
                    </Sticky>

                </Grid>
            </Layout>
        </div >
    )
}

export const query = graphql`
  query wineWednesday  {
                    allContentfulHappyHour(filter: {wine: {eq: true}}) {
                    edges {
                    node {
                        wineWednesday{
                            wineWednesday
                        }
                ...allHappyHourFields
            }
            }
          }
        }
        `


export default WineWednesdayAtlanta;