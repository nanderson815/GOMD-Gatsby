import React from 'react';
import get from 'lodash/get'
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
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

const HappyHour = (props) => {
  const post = get(props, 'data.contentfulHappyHour')
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  console.log(post)
  return (
    <Layout>
      <Helmet
        title={`${post.name} | ${siteTitle}`}
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
                return (
                  <div key={`${index}happyHour`}>
                    <h3 style={{ marginBottom: "-3px" }}>{day}</h3>
                    <p>{post[descField][descField]}</p>
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
                <img style={{ marginBottom: "-5px" }} src={`https://maps.googleapis.com/maps/api/staticmap?center=${post.location.lat},${post.location.lon}&markers=color:blue%7C${post.location.lat},${post.location.lon}&zoom=15&size=400x268&key=AIzaSyDwoqHxtOYa6tDrQXuJS1aDd46uM3GzAJs`} />
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
    contentfulHappyHour(slug: { eq: $slug }) {
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
          }
          monday {
            end
            start
          }
          thursday {
            start
            end
          }
          tuesday {
            end
            start
          }
          wednesday {
            end
            start
          }
          saturday {
            end
            start
          }
          sunday {
            end
            start
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

