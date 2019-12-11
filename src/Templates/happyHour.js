import React from 'react';
import get from 'lodash/get'
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Layout from '../components/layout'

const HappyHour = (props) => {
    const post = get(props, 'data.contentfulHappyHour')
    const siteTitle = get(props, 'data.site.siteMetadata.title')
    console.log(post)
    return (
        <Layout>
            <Helmet title={`${post.name} | ${siteTitle}`} />
            <h1>This is a test for {post.name}</h1>
            <Img alt="" fluid={post.mainImg.fluid}/>
            <p>{post.description.description}</p>
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
      name
      mainImg{
          fluid(maxWidth: 350, resizingBehavior: SCALE) {
            ...GatsbyContentfulFluid_tracedSVG
          }
      }
      description {
          description
        }
      createdAt(formatString: "MMMM Do, YYYY")
      }
    }
`