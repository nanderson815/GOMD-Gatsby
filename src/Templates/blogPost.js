import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Grid, Card, Label, Segment, Sticky, Divider } from 'semantic-ui-react'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import AdSense from 'react-adsense'
import useContentfulImage from '../hooks/useContentfulImage'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Header from '../components/header/header'

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const fluid = useContentfulImage(node.data.target.fields.file['en-US'].url)
      return (
        <Img
          style={{ maxHeight: '300px' }}
          alt={node.data.target.fields.title['en-US']}
          title={node.data.target.fields.title['en-US']}
          fluid={fluid.fluid}
        />
      )
    },
    [BLOCKS.HR]: () => <Divider />
  }
}

const BlogPost = props => {
  const post = get(props, 'data.contentfulBlogPost')
  const document = post.body.json
  const doc2 = documentToReactComponents(document, options)

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
          <Grid.Column tablet={5} computer={5} mobile={16}>
            <Sticky offset={90}>
              <Segment raised style={{ paddingBottom: '1px' }}>
                <AdSense.Google
                  client='ca-pub-4839737207231731'
                  slot='4063925755'
                  responsive='true'
                  format='auto'
                  style={{ display: 'block', width: '100% !important' }}
                />
                <p style={{ width: '100%', textAlign: 'center', fontSize: '12px' }}>
                  <i>sponsored content</i>
                </p>
              </Segment>
            </Sticky>
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
