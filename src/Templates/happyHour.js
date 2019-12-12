import React from 'react';
import get from 'lodash/get'
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Layout from '../components/layout'
import { Grid, Segment } from 'semantic-ui-react'

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
          <Segment>
            <h1>{post.name}</h1>
            <Img style={{ borderRadius: "5px" }} alt={post.name} fluid={post.mainImg.fluid} />
            <h2>Description</h2>
            <p>{post.description.description}</p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <p>This is the stackable sidebar.</p>
            <a href={`https://google.com/maps/?q=${post.address}`}>
              <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${post.location.lat},${post.location.lon}&markers=color:blue%7C${post.location.lat},${post.location.lon}&zoom=15&size=400x300&key=AIzaSyDwoqHxtOYa6tDrQXuJS1aDd46uM3GzAJs`} />
            </a>
          </Segment>
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

