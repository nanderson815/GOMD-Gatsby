import React from 'react';
import get from 'lodash/get'
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { Container } from '@material-ui/core';

const HappyHour = (props) => {
    const post = get(props, 'data.contentfulHappyHour')
    const siteTitle = get(props, 'data.site.siteMetadata.title')
    console.log(post)
    return (
        <Container>
            <Helmet title={`${post.name} | ${siteTitle}`} />
            <h1>This is a test for {post.name}</h1>
            <p>{post.description.description}</p>
        </Container>
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
      name
      description {
          description
        }
      createdAt(formatString: "MMMM Do, YYYY")
      }
    }
`