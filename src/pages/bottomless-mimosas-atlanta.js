import React, { useEffect } from 'react'
import Header from '../components/header'
import SEO from '../components/seo'
import Layout from '../components/layout'
import { Grid, Label, Segment, Container, Divider, Icon, Responsive, Sticky } from 'semantic-ui-react'
import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'
import BottomlessMap from '../components/bottomlessMimosaMap'
import { navigate, Link, graphql } from 'gatsby'


const BottomlessMimosas = (props) => {
    let MimosaData = props.data.allContentfulHappyHour.edges.map(item => item.node);
    const [center, setCenter] = React.useState('')

    let brunches = MimosaData.map((deal) => {
        return (
            <div data-lat={deal.location.lat} data-lon={deal.location.lon} id={deal.id} key={deal.id}>
                <Img alt={`${deal.name} bottomless mimosas`} title={`${deal.name} bottomless mimosas`} fluid={deal.mainImg.fluid} style={{ width: "100%", maxHeight: "400px", borderRadius: "5px" }}></Img>
                <Link to={`/atlanta-happy-hour/${deal.slug}`}> <h1>{deal.name}</h1></Link>
                <p style={{ fontSize: "13px" }}><Icon name='map marker alternate'></Icon>{deal.address}</p>
                <p>{deal.brunchDesc.brunchDesc}</p>
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
        brunches.forEach(card => elements.push(document.getElementById(`${card.key}`)))
        createObserver(elements);
    }, [])

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, [])

    const handleClick = (e) => {
        let tag = "Bottomless Mimosas"
        navigate("/happy-hour-finder", {
            state: { tag: tag },
        })
    }


    return (
        <div>
            <SEO
                title="Every Atlanta Restaurant with Bottomless Mimosas (2020)"
                image='/mimosas.png'
                description="Bottomless mimosas are the essential brunch beverage for a successful day of drinking. Bottomless Mimosas Atlanta - the best way to celebrate your brunch!"></SEO>
            <Header></Header>
            <Segment style={{ marginTop: "-15px" }}>
                <Container>
                    <Grid stackable>
                        <Grid.Column computer={10}>
                            <Label color='blue'>Guide</Label>
                            <h1 style={{ fontSize: "calc((.4em + 1.5vmin) + (.4em + 1.5vmax))", marginTop: "0px" }}>Bottomless Mimosas in the ATL</h1>
                            <p>Your guide to successful day drinking.</p>
                        </Grid.Column>
                        <Grid.Column computer={6}>
                            <div style={{ borderRadius: '5px', overflow: "hidden" }}>
                                <BackgroundImage
                                    onClick={handleClick}
                                    fluid={[`linear-gradient(rgba(225, 225, 225, 0.2), rgba(0, 0, 0, 0.9))`, props.data.file.childImageSharp.fluid]}
                                    style={{ height: "200px", display: "flex", textAlign: 'center' }}
                                >
                                    <div style={{ margin: "auto", color: "white" }}>
                                        <p>View the map.</p>
                                    </div>
                                </BackgroundImage>
                            </div>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Segment>
            <Layout>
                <Grid >
                    <Grid.Column computer={10} tablet={10} mobile={16}>
                        <p style={{ fontWeight: '400' }}>Everyone knows that bottomless mimosas are the essential brunch beverage for a successful day of drinking.
                            However, due to some sketchy alcohol laws in the Atlanta, it can sometimes be hard to find all the places that offer bottomless drinks.
                            Thankfully, we have assembled a list of every single location that offers bottomless mimosas, sangria, bloody marys, or cocktails of any kind!
                    Check out every restaurant (that we know about) that serves bottomless mimosas in Atlanta!</p>
                        <Divider></Divider>
                        {brunches}
                    </Grid.Column>
                    <Sticky as={Grid.Column} offset={90} tablet={6} computer={6}>
                        <Responsive minWidth={768}>
                            <Segment style={{ padding: '0px' }}>
                                <BottomlessMap
                                    happyHours={MimosaData}
                                    center={center}
                                    isMarkerShown
                                    loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
                                    containerElement={<div style={{ height: `350px`, width: "100%" }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}>
                                </BottomlessMap >
                            </Segment>
                        </Responsive>
                    </Sticky>

                </Grid>
            </Layout>
        </div >
    )
}

// Gimmy those bottomless mimosa deals baby.
export const query = graphql`
  query bottomlessMimosas  {
                    allContentfulHappyHour(filter: {tags: {in: "Bottomless Mimosas"}}) {
                    edges {
                    node {
                    brunchDesc {
                    brunchDesc
                }
                ...allHappyHourFields
            }
            }
          }
          file(relativePath: { eq: "map.PNG" }) {
      childImageSharp {
        fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
        }
        `


export default BottomlessMimosas;