import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Grid, Card, Label } from 'semantic-ui-react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Header from '../components/header/header'
import Layout from '../components/layout'
import SEO from '../components/seo'

const BlogPost = props => {
  const post = get(props, 'data.contentfulBlogPost')
  const document = post.body.json
  const doc2 = documentToReactComponents(document)

  return (
    <>
      <Header />
      <SEO title={post.title} description={post.seoDesc} />
      <Layout>
        <Grid stackable columns='equal'>
          <Grid.Column>
            <Card fluid raised>
              <Img style={{ maxHeight: '450px' }} alt={post.title} fluid={post.image.fluid} />
              <Card.Content>
                <Card.Header>
                  <h1 style={{ marginBottom: '-3px' }}>{post.title}</h1>
                  <Card.Meta>{post.date}</Card.Meta>
                  <Label color='blue' ribbon style={{ fontSize: '15px' }}>
                    {post.category}
                  </Label>
                </Card.Header>
              </Card.Content>
              <Card.Content>{doc2}</Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Layout>
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
    contentfulBlogPost(slug: { eq: $slug }) {
      ...allBlogPostFields
    }
  }
`
