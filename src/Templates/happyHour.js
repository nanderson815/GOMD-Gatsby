import React from 'react';
import get from 'lodash/get'
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Header from '../components/header'
import Img from 'gatsby-image';
import Layout from '../components/layout'
import { Grid, Label, Card, Sticky } from 'semantic-ui-react'

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
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  console.log(post)
  return (
    <>
      <Header></Header>
      <Layout>
        <Helmet
          title={`${post.name} Happy Hour | ${siteTitle}`}
        >
          <meta name="description" content={post.seoDescription} />
        </Helmet>
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
            <Sticky>
              <Card fluid raised>
                <a
                  style={{ marginBottom: '-18px' }}
                  href={`https://google.com/maps/?q=${post.address}`}>
                  <img alt="resetaurant location map" style={{ marginBottom: "-5px" }} src={`https://maps.googleapis.com/maps/api/staticmap?center=${post.location.lat},${post.location.lon}&markers=color:0x1c70b5%7C${post.location.lat},${post.location.lon}&zoom=15&size=400x268&key=${process.env.GOOGLE_MAPS_API_KEY}`} />
                </a>
                <Card.Content style={{ background: "white" }}>
                  <Card.Description>
                    {post.address}
                  </Card.Description>
                  <Card.Description>
                    {`${formatPhoneNumber(post.phone)} |`} <a style={{ color: "#1c70b5", fontWeight: "bold" }} href={post.website}>Website</a>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Sticky>
          </Grid.Column>
        </Grid>
      </Layout>
    </>
  )
}

export default HappyHour

export const pageQuery = graphql`
  query HappyHourBySlug($slug: String!) {
        site {
        siteMetadata {
        title
      }
      }
    contentfulHappyHour(slug: {eq: $slug }) {
        best
        seoDescription
      days
        fridayDesc {
        fridayDesc
      }
      hours {
        friday {
            end
            start
            start2
            end2
    }
          monday {
        end
            start
            start2
            end2
    }
          thursday {
        start
            end
            start2
            end2
    }
          tuesday {
        end
            start
            start2
            end2
    }
          wednesday {
        end
            start
            start2
            end2
    }
          saturday {
        end
            start
            start2
            end2
    }
          sunday {
        end
            start
            start2
            end2
    }
  }
  id
        location {
        lat
          lon
    }
    address
    neighborhood
    name
        mondayDesc {
        mondayDesc
      }
      phone
      slug
        thursdayDesc {
        thursdayDesc
      }
      tuesdayDesc {
        tuesdayDesc
      }
      website
        wednesdayDesc {
        wednesdayDesc
      }
      description {
        description
      }
      tags
        sundayDesc {
        sundayDesc
      }
      saturdayDesc{
        saturdayDesc
      }
      mainImg{
        fluid(maxWidth: 1800, resizingBehavior: SCALE) {
        ...GatsbyContentfulFluid_tracedSVG
      }
      }
    }
  }
`

