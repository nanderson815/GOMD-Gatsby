import React, { useEffect } from 'react';
import get from 'lodash/get'
import { graphql } from 'gatsby';
import Header from '../components/header'
import Img from 'gatsby-image';
import Layout from '../components/layout'
import { Grid, Label, Card, Sticky, Segment } from 'semantic-ui-react'
import SEO from '../components/seo'
import NearbyHH from '../components/nearbyHH'

let formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ('' + str).replace(/\D/g, '');
  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  };
  return null
};

const formatTime = (time24) => {
  const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
  const period = +sHours < 12 ? 'AM' : 'PM';
  const hours = +sHours % 12 || 12;

  return `${hours}:${minutes}${period}`;
}

const setHHTime = (post, day) => {
  if (post.hours[day].end2 !== null) {
    return (
      <strong>{` ${formatTime(post.hours[day].start)} - ${formatTime(post.hours[day].end)} & ${formatTime(post.hours[day].start2)} - ${formatTime(post.hours[day].end2)}:`} </strong>
    )
  } else {
    return <strong>{` ${formatTime(post.hours[day].start)} - ${formatTime(post.hours[day].end)}:`} </strong>
  }
}

const HappyHour = (props) => {
  const post = get(props, 'data.contentfulHappyHour')
  const nearbyHH = get(props, 'data.allContentfulHappyHour.edges').map(item => item.node).filter(item => item.name !== post.name);
  console.log(nearbyHH)

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [])

  return (
    <>
      <Header></Header>
      <SEO title={`${post.name} Happy Hour`}
        description={post.seoDescription} />
      <Layout>
        <Grid stackable columns="equal">
          <Grid.Column width={11}>
            <Card fluid raised>
              <Img style={{ maxHeight: "350px" }} alt={post.name} fluid={post.mainImg.fluid} />
              <Card.Content>
                <Card.Header>
                  <h1 style={{ marginBottom: "-3px" }}>{post.name}</h1>
                  <p>{post.neighborhood}</p>
                  {post.tags.map((tag, index) => <Label key={`${index}label`}>{tag}</Label>)}
                </Card.Header>

              </Card.Content>
              <Card.Content>
                <h2>Description</h2>
                <p>{post.description.description}</p>
                <h2>Happy Hours</h2>
                {post.days.map((day, index) => {
                  let descField = day.toLowerCase() + "Desc"
                  let timeField = day.toLowerCase()
                  return (
                    <div key={`${index}happyHour`}>
                      <h3 style={{ marginBottom: "-3px" }}> <u>{day}</u></h3>
                      <p>{setHHTime(post, timeField)} {`${post[descField][descField]}`}</p>
                      <hr></hr>
                    </div>
                  )
                })}
              </Card.Content>

            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card fluid raised>
              <div
                style={{ overflow: 'hidden', height: "225px" }}
              >
                {/* <img alt="resetaurant location map" style={{ marginBottom: "-5px" }} src={`https://maps.googleapis.com/maps/api/staticmap?center=${post.location.lat},${post.location.lon}&markers=color:0x1c70b5%7C${post.location.lat},${post.location.lon}&zoom=15&size=500x268&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`} /> */}
                <iframe title="Happy Hour Map" width="100%" height="240px" frameBorder="0" style={{ border: "0", margin: "0px" }} src={`https://www.google.com/maps/embed/v1/place?q=${post.address}&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`}></iframe>
              </div>
              <Card.Content style={{ background: "white" }}>
                <Card.Description>
                  <a
                    style={{ color: "grey" }}
                    href={`https://www.google.com/maps/search/?api=1&query=${post.address}`}>
                    {post.address}

                  </a>
                </Card.Description>
                <Card.Description>
                  {`${formatPhoneNumber(post.phone)} |`} <a style={{ color: "#1c70b5", fontWeight: "bold" }} href={post.website}>Website</a>
                </Card.Description>
              </Card.Content>
            </Card>

            <Segment style={{ paddingTop: '10px' }}>
              <h4 style={{ marginBottom: "20px" }}>Other Happy Hours in {post.neighborhood}</h4>
              <NearbyHH happyHours={nearbyHH}></NearbyHH>
            </Segment>
          </Grid.Column>
        </Grid>
      </Layout >
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
    contentfulHappyHour(slug: {eq: $slug }) {
      ...allHappyHourFields
    }
    allContentfulHappyHour(filter: {neighborhood: {eq: $neighborhood}}) {
    edges {
      node {
        ...allHappyHourFields
      }
    }
  }
  }
`

