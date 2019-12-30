import React from 'react';
import get from 'lodash/get'
import { graphql } from 'gatsby';
import Header from '../components/header'
import Img from 'gatsby-image';
import Layout from '../components/layout'
import { Grid, Label, Card, Sticky } from 'semantic-ui-react'
import SEO from '../components/seo'

const BlogPost = (props) => {
  const post = get(props, 'data.contentfulBlogPost')
  return (
    <>
      <Header></Header>
      <SEO title={post.title}
        description={post.seoDesc} />
      <Layout>
        <Grid stackable columns="equal">
          <Grid.Column width={12}>
            <Card fluid raised>
              <Img style={{ maxHeight: "350px" }} alt={post.title} fluid={post.image.fluid} />
              <Card.Content>
                <Card.Header>
                  <h1 style={{ marginBottom: "-3px" }}>{post.title}</h1>
                  <p>{post.date}</p>
                  <p>{post.category}</p>
                </Card.Header>

              </Card.Content>
              <Card.Content>
                <h2>Description</h2>
              </Card.Content>

            </Card>
          </Grid.Column>
          <Grid.Column>
            <Sticky>
              <Card fluid raised>
              </Card>
            </Sticky>
          </Grid.Column>
        </Grid>
      </Layout >
    </>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
        site {
        siteMetadata {
        title
      }
      }
    contentfulBlogPost(slug: {eq: $slug }) {
      ...allBlogPostFields
    }
  }
`

