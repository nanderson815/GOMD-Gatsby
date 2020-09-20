import React, { useEffect } from "react"
import get from "lodash/get"
import { navigate, graphql } from "gatsby"
import Header from "../components/header"
import CovidMessage from "../components/covidMessage"
import Img from "gatsby-image"
import Layout from "../components/layout"
import { Grid, Label, Card, Segment, Button } from "semantic-ui-react"
import SEO from "../components/seo"
import NearbyHH from "../components/nearbyHH"
import { setHHTime, formatPhoneNumber, sortByDay } from "../Util/Util"
import AdSense from "react-adsense"

const handleClick = (e) => {
  let tag = e.target.value
  navigate("/happy-hour-finder", {
    state: { tag: tag },
  })
}

const HappyHour = (props) => {
  const post = get(props, "data.contentfulHappyHour")
  const nearbyHH = get(props, "data.allContentfulHappyHour.edges")
    .map((item) => item.node)
    .filter((item) => item.name !== post.name)

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }, [])

  return (
    <>
      <Header></Header>
      <SEO
        title={`${post.name} Happy Hour`}
        description={post.seoDescription}
        image={post.mainImg.fluid.src}
        happyHour={true}
      />
      <Layout>
        <Grid>
          <Grid.Column computer={11} tablet={11} mobile={16}>
            <CovidMessage />
            <Card fluid raised>
              <Img
                style={{ maxHeight: "350px" }}
                alt={post.name}
                fluid={post.mainImg.fluid}
              />
              <Card.Content>
                <Card.Header>
                  <h1 style={{ marginBottom: "-3px" }}>{post.name}</h1>
                  <p>{post.neighborhood}</p>
                  {post.tags.map((tag, index) => (
                    <Label
                      as={Button}
                      key={`${index}label`}
                      value={tag}
                      onClick={handleClick}
                    >
                      {tag}
                    </Label>
                  ))}
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <h2>Description</h2>
                <p>{post.description.description}</p>
                <h2>Happy Hours</h2>
                {sortByDay(post.days).map((day, index) => {
                  let descField = day.toLowerCase() + "Desc"
                  let timeField = day.toLowerCase()
                  return (
                    <div key={`${index}happyHour`}>
                      <h3 style={{ marginBottom: "-3px" }}>
                        <u>{day}</u>
                      </h3>
                      <p>
                        {setHHTime(post, timeField)}{" "}
                        {`${post[descField][descField]}`}
                      </p>
                      <hr></hr>
                    </div>
                  )
                })}
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column tablet={5} computer={5} mobile={16}>
            <Card fluid raised>
              <div style={{ overflow: "hidden", height: "225px" }}>
                {/* <img alt="resetaurant location map" style={{ marginBottom: "-5px" }} src={`https://maps.googleapis.com/maps/api/staticmap?center=${post.location.lat},${post.location.lon}&markers=color:0x1c70b5%7C${post.location.lat},${post.location.lon}&zoom=15&size=500x268&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`} /> */}
                <iframe
                  title="Happy Hour Map"
                  width="100%"
                  height="240px"
                  frameBorder="0"
                  style={{ border: "0", margin: "0px" }}
                  src={`https://www.google.com/maps/embed/v1/place?q=${post.address}&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`}
                ></iframe>
              </div>
              <Card.Content style={{ background: "white" }}>
                <Card.Description>
                  <a
                    style={{ color: "grey" }}
                    href={`https://www.google.com/maps/search/?api=1&query=${post.address}`}
                  >
                    {post.address}
                  </a>
                </Card.Description>
                <Card.Description>
                  {`${formatPhoneNumber(post.phone)} |`}{" "}
                  <a
                    style={{ color: "#1c70b5", fontWeight: "bold" }}
                    href={post.website}
                  >
                    Website
                  </a>
                </Card.Description>
              </Card.Content>
            </Card>
            <Segment raised style={{ paddingBottom: "1px" }}>
              <AdSense.Google
                client="ca-pub-4839737207231731"
                slot="4063925755"
                responsive="true"
                format="auto"
                style={{ display: "block", width: "100% !important" }}
              />
              <p
                style={{ width: "100%", textAlign: "center", fontSize: "12px" }}
              >
                <i>sponsored content</i>
              </p>
            </Segment>
            <Segment raised style={{ paddingTop: "10px" }}>
              <h4
                style={{
                  marginBottom: "25px",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                Other Happy Hours in {post.neighborhood}
              </h4>
              <NearbyHH happyHours={nearbyHH}></NearbyHH>
            </Segment>
          </Grid.Column>
        </Grid>
      </Layout>
    </>
  )
}

export default HappyHour

export const pageQuery = graphql`
  query HappyHourBySlug($slug: String!, $neighborhood: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulHappyHour(slug: { eq: $slug }) {
      ...allHappyHourFields
    }
    allContentfulHappyHour(filter: { neighborhood: { eq: $neighborhood } }) {
      edges {
        node {
          ...allHappyHourFields
        }
      }
    }
  }
`
